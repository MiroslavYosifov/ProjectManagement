import { test, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import { Authorization, ProjectRole } from '../../middlewares/authorization/index.js';
import { ProjectMembersRepository } from '../../repository/projectMembers/index.js';
import { mockReq, mockRes, mockNext } from '../helpers/http.js';

// Each test stubs ProjectMembersRepository.findRole to return a chosen role
// (or null), so we test the middleware's decision logic without a database.
afterEach(() => mock.restoreAll());

function run(minRole, { roleReturned }) {
    mock.method(ProjectMembersRepository, 'findRole', async () => roleReturned);
    const mw = Authorization.requireProjectRole(minRole);
    const req = mockReq({
        params: { projectId: '11111111-1111-1111-1111-111111111111' },
        user: { id: '22222222-2222-2222-2222-222222222222' },
    });
    const res = mockRes();
    const next = mockNext();
    return { mw, req, res, next };
}

// ---------------------------------------------------------------------------
// ProjectRole rank map: the whole access model relies on this ordering.
// ---------------------------------------------------------------------------
test('ProjectRole: ranks are strictly increasing VIEWER < EDITOR < OWNER', () => {
    assert.ok(ProjectRole.VIEWER < ProjectRole.EDITOR);
    assert.ok(ProjectRole.EDITOR < ProjectRole.OWNER);
});

// ---------------------------------------------------------------------------
// requireProjectRole
// ---------------------------------------------------------------------------
test('requireProjectRole: non-member -> 404 (does not reveal existence)', async () => {
    const { mw, req, res, next } = run('VIEWER', { roleReturned: null });
    await mw(req, res, next);
    assert.equal(res.statusCode, 404);
    assert.equal(next.called, false);
});

test('requireProjectRole: role below threshold -> 403', async () => {
    // VIEWER (rank 1) trying to hit an EDITOR-required route.
    const { mw, req, res, next } = run('EDITOR', { roleReturned: 'VIEWER' });
    await mw(req, res, next);
    assert.equal(res.statusCode, 403);
    assert.equal(next.called, false);
});

test('requireProjectRole: exact role -> next() and sets req.projectRole', async () => {
    const { mw, req, res, next } = run('EDITOR', { roleReturned: 'EDITOR' });
    await mw(req, res, next);
    assert.equal(next.called, true);
    assert.equal(next.error, undefined);
    assert.equal(res.statusCode, undefined);
    assert.equal(req.projectRole, 'EDITOR');
});

test('requireProjectRole: higher role satisfies lower threshold', async () => {
    // OWNER (rank 3) on a VIEWER-required route should pass.
    const { mw, req, res, next } = run('VIEWER', { roleReturned: 'OWNER' });
    await mw(req, res, next);
    assert.equal(next.called, true);
    assert.equal(req.projectRole, 'OWNER');
});

test('requireProjectRole: repository error is forwarded to next(err)', async () => {
    mock.method(ProjectMembersRepository, 'findRole', async () => {
        throw new Error('db down');
    });
    const mw = Authorization.requireProjectRole('VIEWER');
    const req = mockReq({
        params: { projectId: '11111111-1111-1111-1111-111111111111' },
        user: { id: '22222222-2222-2222-2222-222222222222' },
    });
    const res = mockRes();
    const next = mockNext();
    await mw(req, res, next);
    assert.equal(next.called, true);
    assert.ok(next.error instanceof Error);
    assert.equal(res.statusCode, undefined);
});
