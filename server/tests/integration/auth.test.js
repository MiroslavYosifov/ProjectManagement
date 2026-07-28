import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../helpers/db.js';
import { registerAndLogin } from '../helpers/auth.js';
import { mintToken, tamperToken } from '../helpers/jwt.js';

before(resetDb);       // clean slate when the file starts
beforeEach(resetDb);   // ...and before every test
after(disconnectDb);   // close the pool so the process can exit

const VALID = { email: 'alice@example.com', password: 'password123', username: 'alice' };

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------
test('POST /auth/register: 201 and returns the public user', async () => {
    const res = await request(app).post('/api/auth/register').send(VALID);
    assert.equal(res.status, 201);
    assert.equal(res.body.user.email, 'alice@example.com');
    assert.equal(res.body.user.username, 'alice');
    assert.ok(res.body.user.id);
    assert.equal(res.body.user.password_hash, undefined);
});

test('POST /auth/register: 409 on duplicate email', async () => {
    await request(app).post('/api/auth/register').send(VALID);
    const res = await request(app).post('/api/auth/register').send(VALID);
    assert.equal(res.status, 409);
});

test('POST /auth/register: 400 on invalid email', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'nope', password: 'password123' });
    assert.equal(res.status, 400);
});

test('POST /auth/register: concurrent duplicate registrations -> one 201, one 409', async () => {
    const [first, second] = await Promise.all([
        request(app).post('/api/auth/register').send(VALID),
        request(app).post('/api/auth/register').send(VALID),
    ]);
    const statuses = [first.status, second.status].sort();
    assert.deepEqual(statuses, [201, 409]);
});

test('POST /auth/register: username omitted or explicit null both persist as null', async () => {
    const omitted = { email: 'omitted@example.com', password: 'password123' };
    const resOmitted = await request(app).post('/api/auth/register').send(omitted);
    assert.equal(resOmitted.status, 201);
    assert.equal(resOmitted.body.user.username, null);
    const rowOmitted = await prisma.user.findUnique({ where: { id: resOmitted.body.user.id } });
    assert.equal(rowOmitted.username, null);

    const explicitNull = { email: 'nullname@example.com', password: 'password123', username: null };
    const resNull = await request(app).post('/api/auth/register').send(explicitNull);
    assert.equal(resNull.status, 201);
    assert.equal(resNull.body.user.username, null);
    const rowNull = await prisma.user.findUnique({ where: { id: resNull.body.user.id } });
    assert.equal(rowNull.username, null);
});

test('POST /auth/register: empty string username is rejected and never persisted', async () => {
    const email = 'emptyname@example.com';
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email, password: 'password123', username: '' });
    assert.equal(res.status, 400);

    const row = await prisma.user.findUnique({ where: { email } });
    assert.equal(row, null);
});

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
test('POST /auth/login: 200 with access + refresh tokens', async () => {
    await request(app).post('/api/auth/register').send(VALID);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: VALID.email, password: VALID.password });
    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);
    assert.match(res.body.refreshToken, /\./); // "<sessionId>.<secret>"
});

test('POST /auth/login: 401 on wrong password', async () => {
    await request(app).post('/api/auth/register').send(VALID);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: VALID.email, password: 'wrong-password' });
    assert.equal(res.status, 401);
});

test('POST /auth/login: email is case-insensitive and persisted lowercase', async () => {
    const password = 'password123';
    const registerRes = await request(app)
        .post('/api/auth/register')
        .send({ email: 'Case@Example.com', password });
    assert.equal(registerRes.status, 201);

    const row = await prisma.user.findUnique({ where: { id: registerRes.body.user.id } });
    assert.equal(row.email, 'case@example.com');

    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'case@example.com', password });
    assert.equal(loginRes.status, 200);
});

// ---------------------------------------------------------------------------
// Refresh token
// ---------------------------------------------------------------------------
test('POST /auth/refresh: 200 rotates and the old token is then rejected', async () => {
    const { refreshToken } = await registerAndLogin(app, VALID);

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);
    assert.notEqual(res.body.refreshToken, refreshToken); // rotated

    // The old refresh token was revoked during rotation.
    const reuse = await request(app).post('/api/auth/refresh').send({ refreshToken });
    assert.equal(reuse.status, 401);

    // The new one still works.
    const next = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: res.body.refreshToken });
    assert.equal(next.status, 200);
});

test('POST /auth/refresh: 401 on a structurally invalid token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken: 'garbage' });
    assert.equal(res.status, 401);
});

test('POST /auth/refresh: 400 when no token supplied', async () => {
    const res = await request(app).post('/api/auth/refresh').send({});
    assert.equal(res.status, 400);
});

test('POST /auth/refresh: 401 "Refresh token expired" for an expired session', async () => {
    const { user } = await registerAndLogin(app, VALID);
    const session = await prisma.session.create({
        data: {
            userId: user.id,
            refreshHash: await bcrypt.hash('irrelevant-secret', 10),
            expiresAt: new Date(Date.now() - 1000),
        },
    });

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${session.id}.irrelevant-secret` });
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Refresh token expired');
});

test('POST /auth/refresh: 401 "Invalid refresh token" for a well-formed but non-existent session id', async () => {
    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${crypto.randomUUID()}.somesecret` });
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid refresh token');
});

test('POST /auth/refresh: 401 "Invalid refresh token" when the secret half is empty', async () => {
    const { refreshToken } = await registerAndLogin(app, VALID);
    const [sessionId] = refreshToken.split('.');

    const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: `${sessionId}.` });
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid refresh token');
});

test('POST /auth/refresh: reuse detection revokes only the reused session, not sibling sessions', async () => {
    const email = 'multidevice@example.com';
    const password = 'password123';
    await request(app).post('/api/auth/register').send({ email, password });

    // Two independent logins = two sibling sessions ("two devices").
    const loginA = await request(app).post('/api/auth/login').send({ email, password });
    const loginB = await request(app).post('/api/auth/login').send({ email, password });
    const refreshTokenA = loginA.body.refreshToken;
    const refreshTokenB = loginB.body.refreshToken;

    // Rotate A once, then reuse the original A token -> reuse detected.
    const rotateA = await request(app).post('/api/auth/refresh').send({ refreshToken: refreshTokenA });
    assert.equal(rotateA.status, 200);
    const reuseA = await request(app).post('/api/auth/refresh').send({ refreshToken: refreshTokenA });
    assert.equal(reuseA.status, 401);
    assert.equal(reuseA.body.message, 'Refresh token revoked');

    // B was never touched, so it must still work.
    const refreshB = await request(app).post('/api/auth/refresh').send({ refreshToken: refreshTokenB });
    assert.equal(refreshB.status, 200);
});

test("POST /auth/refresh: new access token's sid claim matches the new session", async () => {
    const { refreshToken } = await registerAndLogin(app, VALID);

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    assert.equal(res.status, 200);

    const payload = jwt.verify(res.body.accessToken, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const [newSessionId] = res.body.refreshToken.split('.');
    assert.equal(payload.sid, newSessionId);
});

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
test('POST /auth/logout: revokes the session so its refresh token stops working', async () => {
    const { accessToken, refreshToken } = await registerAndLogin(app, VALID);

    const logout = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`);
    assert.equal(logout.status, 200);

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    assert.equal(res.status, 401);
});

test('POST /auth/logout: 401 without an access token', async () => {
    const res = await request(app).post('/api/auth/logout');
    assert.equal(res.status, 401);
});

test('POST /auth/logout: idempotent, calling twice both return 200', async () => {
    const { accessToken } = await registerAndLogin(app, VALID);

    const first = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(first.status, 200);

    const second = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(second.status, 200);
});

test("POST /auth/logout: 200 even when the access token's session was already revoked by a refresh rotation", async () => {
    const { accessToken, refreshToken } = await registerAndLogin(app, VALID);

    // Rotating revokes the *old* session, but `accessToken` above still
    // carries that old session's sid and remains cryptographically valid.
    const refreshRes = await request(app).post('/api/auth/refresh').send({ refreshToken });
    assert.equal(refreshRes.status, 200);

    const logout = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(logout.status, 200);
});

// Known gap: Authentication.authenticate only checks the JWT's signature and
// expiry, never cross-checking session.revoked_at — so a still-unexpired
// access token keeps working after logout. Documented here, not fixed.
test('GET /projects: access token still works after logout (documents known gap)', async () => {
    const { accessToken } = await registerAndLogin(app, VALID);

    const logout = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(logout.status, 200);

    const res = await request(app).get('/api/projects').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(res.status, 200);
});

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

test('GET /projects: 401 with an expired access token', async () => {
    const token = mintToken({ expiresIn: '-10s' });
    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is expired');
});

test('GET /projects: 401 with a token signed by the wrong secret', async () => {
    const token = mintToken({ secret: 'not-the-real-secret' });
    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is invalid');
});

test('GET /projects: 401 when a real token has its sub claim tampered with', async () => {
    const { accessToken } = await registerAndLogin(app);
    const tampered = tamperToken(accessToken, { payload: { sub: '00000000-0000-0000-0000-000000000000' } });

    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${tampered}`);
    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is invalid');
});

test('GET /projects: 401 with an alg:none token', async () => {
    const token = mintToken({ algorithm: 'none' });
    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
    assert.equal(res.status, 401);
});