import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

async function registerAndLogin(email) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return res.body.accessToken;
}

function tamper(token) {
    const [header, payload, signature] = token.split('.');
    const flippedChar = payload[10] === 'a' ? 'b' : 'a';
    const tamperedPayload = payload.slice(0, 10) + flippedChar + payload.slice(11);
    return `${header}.${tamperedPayload}.${signature}`;
}

test('GET /projects: 401 when Authorization header is missing', async () => {
    const res = await request(app).get('/api/projects');

    assert.equal(res.status, 401);
});

test('GET /projects: 401 with an invalid/garbage token, not a 500', async () => {
    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer potato');

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is invalid');
});

test('GET /projects: 401 with a tampered token (signature no longer matches payload)', async () => {
    const accessToken = await registerAndLogin('tamper@test.com');
    const tamperedToken = tamper(accessToken);

    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${tamperedToken}`);

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is invalid');
});

test('GET /projects: 401 with an expired access token', async () => {
    const expiredToken = jwt.sign(
        { sub: 'some-user-id', email: 'expired@test.com', sid: 'some-session-id' },
        process.env.JWT_SECRET,
        { expiresIn: '-1s' }
    );

    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${expiredToken}`);

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Token is expired');
});

test('GET /projects: 200 with a valid token, and req.user resolves to the correct authenticated user', async () => {
    const tokenA = await registerAndLogin('userA@test.com');
    const tokenB = await registerAndLogin('userB@test.com');

    await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ name: "User A's project" });

    const resA = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${tokenA}`);
    const resB = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${tokenB}`);

    assert.equal(resA.status, 200);
    assert.equal(resA.body.projects.length, 1);
    assert.equal(resA.body.projects[0].name, "User A's project");

    assert.equal(resB.status, 200);
    assert.equal(resB.body.projects.length, 0);
});
