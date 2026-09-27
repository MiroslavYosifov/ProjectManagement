import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
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

test('POST /auth/logout: 200, and revokes the session tied to the access token', async () => {
    const { accessToken, refreshToken } = await registerAndLogin('logout@test.com');
    const [sessionId] = refreshToken.split('.');

    const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'Logged out successfully');

    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    assert.ok(session.revokedAt);
});

test('POST /auth/logout: the refresh token can no longer be used after logout', async () => {
    const { accessToken, refreshToken } = await registerAndLogin('logout-refresh@test.com');

    await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`);

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

    assert.equal(res.status, 401);
});