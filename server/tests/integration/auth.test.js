import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import bcrypt from 'bcryptjs';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

// Register
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
