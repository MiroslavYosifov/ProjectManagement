import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import request from 'supertest';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

async function registerAndLogin(email) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return res.body;
}

test('POST /auth/refresh: happy path issues new tokens and revokes the old session', async () => {
    const { accessToken: accessTokenA, refreshToken: refreshTokenA } = await registerAndLogin('refresh@test.com');
    const [sessionIdA] = refreshTokenA.split('.');

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: refreshTokenA });

    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);
    assert.notEqual(res.body.accessToken, accessTokenA);
    assert.notEqual(res.body.refreshToken, refreshTokenA);

    const [sessionIdB] = res.body.refreshToken.split('.');
    assert.notEqual(sessionIdB, sessionIdA);

    const sessionA = await prisma.session.findUnique({ where: { id: sessionIdA } });
    assert.ok(sessionA.revokedAt);

    const sessionB = await prisma.session.findUnique({ where: { id: sessionIdB } });
    assert.ok(sessionB);
    assert.equal(sessionB.revokedAt, null);
});

test('POST /auth/refresh: rotation — a refresh token can only be used once (past the grace window)', async () => {
    const { refreshToken: refreshTokenA } = await registerAndLogin('rotation@test.com');

    const first = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: refreshTokenA });
    assert.equal(first.status, 200);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const second = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: refreshTokenA });

    assert.equal(second.status, 401);
});

test('POST /auth/refresh: a just-rotated token reused within the grace period gets back the same tokens, not a second session', async () => {
    const { refreshToken: refreshTokenA } = await registerAndLogin('grace@test.com');

    const first = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: refreshTokenA });
    const second = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: refreshTokenA });

    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal(second.body.accessToken, first.body.accessToken);
    assert.equal(second.body.refreshToken, first.body.refreshToken);

    const user = await prisma.user.findUnique({ where: { email: 'grace@test.com' } });
    const sessions = await prisma.session.findMany({ where: { userId: user.id } });
    assert.equal(sessions.length, 2);
});

test('POST /auth/refresh: concurrent requests with the same token all succeed and share one new session', async () => {
    const { refreshToken } = await registerAndLogin('concurrent@test.com');

    const results = await Promise.all([
        request(app).post('/api/auth/refresh').send({ refreshToken }),
        request(app).post('/api/auth/refresh').send({ refreshToken }),
    ]);

    assert.deepEqual(results.map((r) => r.status), [200, 200]);
    assert.equal(results[0].body.accessToken, results[1].body.accessToken);
    assert.equal(results[0].body.refreshToken, results[1].body.refreshToken);

    const user = await prisma.user.findUnique({ where: { email: 'concurrent@test.com' } });
    const sessions = await prisma.session.findMany({ where: { userId: user.id } });
    assert.equal(sessions.length, 2);
});

test('POST /auth/refresh: 401 on a malformed refresh token, not a 500', async () => {
    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'potato' });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid refresh token');
});

test('POST /auth/refresh: 401 when the token is well-formed but the session does not exist', async () => {
    const fakeSessionId = crypto.randomUUID();
    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${fakeSessionId}.somesecret` });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid refresh token');
});

test('POST /auth/refresh: 401 when the session is expired', async () => {
    await request(app).post('/api/auth/register').send({
        email: 'expired-session@test.com',
        username: 'expiredsession',
        password: 'Password123!',
    });
    const user = await prisma.user.findUnique({ where: { email: 'expired-session@test.com' } });

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            refreshHash: 'irrelevant-hash',
            expiresAt: new Date(Date.now() - 1000),
        },
    });

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${session.id}.anysecret` });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Refresh token expired');
});

test('POST /auth/refresh: 401 when the session is revoked', async () => {
    await request(app).post('/api/auth/register').send({
        email: 'revoked-session@test.com',
        username: 'revokedsession',
        password: 'Password123!',
    });
    const user = await prisma.user.findUnique({ where: { email: 'revoked-session@test.com' } });

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const session = await prisma.session.create({
        data: {
            userId: user.id,
            refreshHash: 'irrelevant-hash',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            revokedAt: yesterday,
        },
    });

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${session.id}.anysecret` });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Refresh token revoked');
});
