import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb } from '../helpers/db.js';
import { registerAndLogin } from '../helpers/auth.js';
import { createProject, addMember } from '../helpers/factories.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

const bearer = (t) => ['Authorization', `Bearer ${t}`];

// Owner + project + a registered (but not-yet-added) user.
async function setup() {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const member = await registerAndLogin(app, { email: 'member@example.com' });
    const outsider = await registerAndLogin(app, { email: 'outsider@example.com' });
    const project = await createProject(app, owner.accessToken);
    return { owner, member, outsider, project };
}

// ---------------------------------------------------------------------------
// Adding / changing members (OWNER only)
// ---------------------------------------------------------------------------
test('OWNER adds a VIEWER -> 200', async () => {
    const { owner, project } = await setup();
    const res = await addMember(app, owner.accessToken, project.id, {
        email: 'member@example.com',
        role: 'VIEWER',
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.member.role, 'VIEWER');
    assert.equal(res.body.member.email, 'member@example.com');
});

test('OWNER changing an existing member role is idempotent (upsert)', async () => {
    const { owner, project } = await setup();
    await addMember(app, owner.accessToken, project.id, { email: 'member@example.com', role: 'VIEWER' });

    const res = await addMember(app, owner.accessToken, project.id, {
        email: 'member@example.com',
        role: 'EDITOR',
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.member.role, 'EDITOR');

    // Still a single membership row for that user.
    const list = await request(app)
        .get(`/api/projects/${project.id}/members`)
        .set(...bearer(owner.accessToken));
    const memberRows = list.body.members.filter((m) => m.email === 'member@example.com');
    assert.equal(memberRows.length, 1);
    assert.equal(memberRows[0].role, 'EDITOR');
});

test('add member with role OWNER -> 400 (not assignable)', async () => {
    const { owner, project } = await setup();
    const res = await addMember(app, owner.accessToken, project.id, {
        email: 'member@example.com',
        role: 'OWNER',
    });
    assert.equal(res.status, 400);
});

test('add member with a non-existent email -> 404', async () => {
    const { owner, project } = await setup();
    const res = await addMember(app, owner.accessToken, project.id, {
        email: 'ghost@example.com',
        role: 'VIEWER',
    });
    assert.equal(res.status, 404);
});

test("changing the owner's own role -> 409", async () => {
    const { owner, project } = await setup();
    const res = await addMember(app, owner.accessToken, project.id, {
        email: 'owner@example.com',
        role: 'EDITOR',
    });
    assert.equal(res.status, 409);
});

// ---------------------------------------------------------------------------
// Removing members
// ---------------------------------------------------------------------------
test('removing the owner row -> 409', async () => {
    const { owner, project } = await setup();
    const res = await request(app)
        .delete(`/api/projects/${project.id}/members/${owner.user.id}`)
        .set(...bearer(owner.accessToken));
    assert.equal(res.status, 409);
});

test('removing a non-member -> 404', async () => {
    const { owner, outsider, project } = await setup();
    const res = await request(app)
        .delete(`/api/projects/${project.id}/members/${outsider.user.id}`)
        .set(...bearer(owner.accessToken));
    assert.equal(res.status, 404);
});

test('OWNER removes an existing member -> 204', async () => {
    const { owner, member, project } = await setup();
    await addMember(app, owner.accessToken, project.id, { email: 'member@example.com', role: 'VIEWER' });

    const res = await request(app)
        .delete(`/api/projects/${project.id}/members/${member.user.id}`)
        .set(...bearer(owner.accessToken));
    assert.equal(res.status, 204);
});

// ---------------------------------------------------------------------------
// Listing members requires at least VIEWER membership
// ---------------------------------------------------------------------------
test('GET members as a non-member -> 404', async () => {
    const { outsider, project } = await setup();
    const res = await request(app)
        .get(`/api/projects/${project.id}/members`)
        .set(...bearer(outsider.accessToken));
    assert.equal(res.status, 404);
});

test('GET members as a VIEWER -> 200', async () => {
    const { owner, member, project } = await setup();
    await addMember(app, owner.accessToken, project.id, { email: 'member@example.com', role: 'VIEWER' });

    const res = await request(app)
        .get(`/api/projects/${project.id}/members`)
        .set(...bearer(member.accessToken));
    assert.equal(res.status, 200);
    // owner + the added viewer
    assert.equal(res.body.members.length, 2);
});

test('a VIEWER cannot add members -> 403', async () => {
    const { owner, member, project } = await setup();
    await addMember(app, owner.accessToken, project.id, { email: 'member@example.com', role: 'VIEWER' });

    const res = await addMember(app, member.accessToken, project.id, {
        email: 'outsider@example.com',
        role: 'VIEWER',
    });
    assert.equal(res.status, 403);
});
