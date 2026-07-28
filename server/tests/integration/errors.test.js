import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb } from '../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

// ---------------------------------------------------------------------------
// Global error handler: body-parser JSON errors
// ---------------------------------------------------------------------------
test('POST with malformed JSON body -> 400, not 500', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .set('Content-Type', 'application/json')
        .send('{"email":');
    assert.equal(res.status, 400);
});
