import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import bcrypt from 'bcryptjs';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);       // clean slate when the file starts
beforeEach(resetDb);   // ...and before every test
after(disconnectDb);   // close the pool so the process can exit

test('POST /auth/register: creates the user, hides the password, stores it hashed', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'testuser', password: 'Password123!' });

    assert.equal(res.status, 201);
    assert.equal(res.body.user.email, 'test@test.com');
    assert.equal(res.body.user.username, 'testuser');
    assert.ok(res.body.user.id);
    assert.equal(res.body.user.password, undefined);
    assert.equal(res.body.user.password_hash, undefined);

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.ok(user);
    assert.notEqual(user.passwordHash, 'Password123!');
    assert.ok(await bcrypt.compare('Password123!', user.passwordHash));
});

test('POST /auth/register: 409 on duplicate email, only the first registration is persisted', async () => {
    await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'testuser', password: 'Password123!' });

    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'other', password: 'DifferentPass1!' });

    assert.equal(res.status, 409);
    assert.equal(res.body.message, 'Email already registered');

    const users = await prisma.user.findMany({ where: { email: 'test@test.com' } });
    assert.equal(users.length, 1);
    assert.equal(users[0].username, 'testuser');
});

test('POST /auth/register: 400 when email is missing', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', password: 'Password123!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Email is required!');

    const user = await prisma.user.findFirst({ where: { username: 'testuser' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when email is malformed', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'not-an-email', username: 'testuser', password: 'Password123!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Email is invalid');

    const user = await prisma.user.findFirst({ where: { username: 'testuser' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when username is not a string', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 12345, password: 'Password123!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Username must be a string');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when username is shorter than 3 characters', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'ab', password: 'Password123!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Username must be min 3 characters');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when username is longer than 20 characters', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'a'.repeat(21), password: 'Password123!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Username must be max 20 characters');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when password is missing', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'testuser' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Password is required!');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when password is shorter than 8 characters', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'testuser', password: 'Short1!' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Password must be min 8 characters');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: 400 when password is longer than 128 characters', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com', username: 'testuser', password: 'a'.repeat(129) });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Password must be max 128 characters');

    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    assert.equal(user, null);
});

test('POST /auth/register: passwords at the 8 and 128 character boundaries are accepted', async () => {
    const min = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test1@test.com', username: 'user1', password: 'a'.repeat(8) });
    assert.equal(min.status, 201);

    const max = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test2@test.com', username: 'user2', password: 'a'.repeat(128) });
    assert.equal(max.status, 201);
});