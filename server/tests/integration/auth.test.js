import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb } from '../helpers/db.js';
import { registerAndLogin } from '../helpers/auth.js';

before(resetDb);       // clean slate when the file starts
beforeEach(resetDb);   // ...and before every test
after(disconnectDb);   // close the pool so the process can exit

const VALID = { email: 'alice@example.com', password: 'password123', username: 'alice' };

// ---------------------------------------------------------------------------
// register
// ---------------------------------------------------------------------------
test('POST /auth/register: 201 and returns the public user', async () => {
    const res = await request(app).post('/api/auth/register').send(VALID);
    assert.equal(res.status, 201);
    assert.equal(res.body.user.email, 'alice@example.com');
    assert.equal(res.body.user.username, 'alice');
    assert.ok(res.body.user.id);
    assert.equal(res.body.user.password_hash, undefined); // never leak the hash
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

// ---------------------------------------------------------------------------
// login
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

// ---------------------------------------------------------------------------
// refresh (rotation)
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

// ---------------------------------------------------------------------------
// logout
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
