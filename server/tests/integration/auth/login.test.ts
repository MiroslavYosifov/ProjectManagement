import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import bcrypt from 'bcryptjs';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

const VALID = { email: 'test@test.com', username: 'testuser', password: 'Password123!' };

test('POST /auth/login: 200 with tokens, and the refresh token is stored hashed, not plaintext', async () => {
    await request(app).post('/api/auth/register').send(VALID);

    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: VALID.email, password: VALID.password });

    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);

    const [sessionId, secret] = res.body.refreshToken.split('.');
    const session = await prisma.session.findUnique({ where: { id: sessionId } });

    assert.ok(session);
    assert.notEqual(session.refreshHash, res.body.refreshToken);
    assert.notEqual(session.refreshHash, secret);
    assert.ok(await bcrypt.compare(secret, session.refreshHash));
});

test('POST /auth/login: 401 on wrong password', async () => {
    await request(app).post('/api/auth/register').send(VALID);

    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: VALID.email, password: 'WrongPassword1!' });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid email or password');
});

test('POST /auth/login: 401 on unknown email, same message as wrong password (no user enumeration)', async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'Password123!' });

    assert.equal(res.status, 401);
    assert.equal(res.body.message, 'Invalid email or password');
});
