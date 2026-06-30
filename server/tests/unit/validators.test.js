import { test } from 'node:test';
import assert from 'node:assert/strict';

import { AuthValidator } from '../../validators/auth/index.js';
import { ProjectsValidator } from '../../validators/projects/index.js';
import { MembersValidator } from '../../validators/members/index.js';
import { ScenesValidator } from '../../validators/scenes/index.js';
import { validateUuidParam } from '../../validators/common/index.js';
import { mockReq, mockRes, mockNext } from '../helpers/http.js';

// Runs a validator middleware against a fake request and returns the captured
// res + next so each test can assert on the outcome with one line.
function run(validator, reqInit) {
    const req = mockReq(reqInit);
    const res = mockRes();
    const next = mockNext();
    validator(req, res, next);
    return { req, res, next };
}

// ---------------------------------------------------------------------------
// AuthValidator.register
// ---------------------------------------------------------------------------
test('AuthValidator.register: passes valid input and normalizes email/username', () => {
    const { res, next, req } = run(AuthValidator.register, {
        body: { email: '  USER@Example.COM ', password: 'password123', username: '  bob ' },
    });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.body.email, 'user@example.com'); // trimmed + lowercased
    assert.equal(req.body.username, 'bob');            // trimmed
});

test('AuthValidator.register: rejects missing email', () => {
    const { res, next } = run(AuthValidator.register, { body: { password: 'password123' } });
    assert.equal(next.called, false);
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /email/i);
});

test('AuthValidator.register: rejects invalid email format', () => {
    const { res } = run(AuthValidator.register, { body: { email: 'not-an-email', password: 'password123' } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /invalid/i);
});

test('AuthValidator.register: rejects password shorter than 8 chars', () => {
    const { res } = run(AuthValidator.register, { body: { email: 'a@b.com', password: 'short' } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /8 characters/);
});

test('AuthValidator.register: rejects password longer than 128 chars', () => {
    const { res } = run(AuthValidator.register, { body: { email: 'a@b.com', password: 'x'.repeat(129) } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /128 characters/);
});

test('AuthValidator.register: rejects username shorter than 3 chars', () => {
    const { res } = run(AuthValidator.register, {
        body: { email: 'a@b.com', password: 'password123', username: 'ab' },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /min 3/);
});

test('AuthValidator.register: null username is allowed and stored as null', () => {
    const { res, next, req } = run(AuthValidator.register, {
        body: { email: 'a@b.com', password: 'password123', username: null },
    });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.body.username, null);
});

// ---------------------------------------------------------------------------
// AuthValidator.login
// ---------------------------------------------------------------------------
test('AuthValidator.login: passes valid input and normalizes email', () => {
    const { res, next, req } = run(AuthValidator.login, {
        body: { email: 'USER@EXAMPLE.COM', password: 'whatever' },
    });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.body.email, 'user@example.com');
});

test('AuthValidator.login: rejects missing password', () => {
    const { res, next } = run(AuthValidator.login, { body: { email: 'a@b.com' } });
    assert.equal(next.called, false);
    assert.equal(res.statusCode, 400);
});

// ---------------------------------------------------------------------------
// ProjectsValidator.create / update
// ---------------------------------------------------------------------------
test('ProjectsValidator.create: passes valid name and trims it', () => {
    const { res, next, req } = run(ProjectsValidator.create, { body: { name: '  My Project ' } });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.body.name, 'My Project');
});

test('ProjectsValidator.create: rejects empty name', () => {
    const { res } = run(ProjectsValidator.create, { body: { name: '   ' } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /required/i);
});

test('ProjectsValidator.create: rejects name over 100 chars', () => {
    const { res } = run(ProjectsValidator.create, { body: { name: 'x'.repeat(101) } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /max 100/);
});

test('ProjectsValidator.create: rejects description over 1000 chars', () => {
    const { res } = run(ProjectsValidator.create, {
        body: { name: 'ok', description: 'x'.repeat(1001) },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /max 1000/);
});

test('ProjectsValidator.update: rejects when no field provided', () => {
    const { res } = run(ProjectsValidator.update, { body: {} });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /at least one/i);
});

test('ProjectsValidator.update: allows updating description only', () => {
    const { res, next } = run(ProjectsValidator.update, { body: { description: 'new desc' } });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
});

// ---------------------------------------------------------------------------
// MembersValidator.add
// ---------------------------------------------------------------------------
test('MembersValidator.add: passes VIEWER role and normalizes email', () => {
    const { res, next, req } = run(MembersValidator.add, {
        body: { email: 'NEW@Example.com', role: 'VIEWER' },
    });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.body.email, 'new@example.com');
});

test('MembersValidator.add: rejects OWNER role (not assignable)', () => {
    const { res, next } = run(MembersValidator.add, {
        body: { email: 'new@example.com', role: 'OWNER' },
    });
    assert.equal(next.called, false);
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /VIEWER, EDITOR/);
});

test('MembersValidator.add: rejects invalid email', () => {
    const { res } = run(MembersValidator.add, { body: { email: 'nope', role: 'EDITOR' } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /invalid/i);
});

test('MembersValidator.add: rejects unknown role', () => {
    const { res } = run(MembersValidator.add, { body: { email: 'a@b.com', role: 'SUPERADMIN' } });
    assert.equal(res.statusCode, 400);
});

// ---------------------------------------------------------------------------
// ScenesValidator
// ---------------------------------------------------------------------------
test('ScenesValidator.create: rejects non-object data', () => {
    const { res } = run(ScenesValidator.create, { body: { name: 'scene', data: 'oops' } });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /object/i);
});

test('ScenesValidator.update: rejects when neither name nor data provided', () => {
    const { res } = run(ScenesValidator.update, { body: {} });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /at least one/i);
});

// ---------------------------------------------------------------------------
// validateUuidParam (factory)
// ---------------------------------------------------------------------------
test('validateUuidParam: passes a valid UUID', () => {
    const mw = validateUuidParam('projectId');
    const { res, next } = run(mw, { params: { projectId: '11111111-1111-1111-1111-111111111111' } });
    assert.equal(next.called, true);
    assert.equal(res.statusCode, undefined);
});

test('validateUuidParam: rejects a malformed UUID', () => {
    const mw = validateUuidParam('projectId');
    const { res, next } = run(mw, { params: { projectId: 'not-a-uuid' } });
    assert.equal(next.called, false);
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /projectId must be a valid UUID/);
});

test('validateUuidParam: validates multiple params and reports the bad one', () => {
    const mw = validateUuidParam('projectId', 'sceneId');
    const { res } = run(mw, {
        params: { projectId: '11111111-1111-1111-1111-111111111111', sceneId: 'bad' },
    });
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /sceneId/);
});
