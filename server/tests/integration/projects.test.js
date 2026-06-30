import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../helpers/db.js';
import { registerAndLogin } from '../helpers/auth.js';
import { createProject, addMember, createScene } from '../helpers/factories.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

const FAKE_UUID = '99999999-9999-4999-8999-999999999999';

// Builds an owner with a project, plus a viewer and an editor already attached.
// Each integration test that needs the full role matrix calls this.
async function setupRoles() {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const viewer = await registerAndLogin(app, { email: 'viewer@example.com' });
    const editor = await registerAndLogin(app, { email: 'editor@example.com' });
    const outsider = await registerAndLogin(app, { email: 'outsider@example.com' });

    const project = await createProject(app, owner.accessToken, { name: 'Shared' });
    await addMember(app, owner.accessToken, project.id, { email: 'viewer@example.com', role: 'VIEWER' });
    await addMember(app, owner.accessToken, project.id, { email: 'editor@example.com', role: 'EDITOR' });

    return { owner, viewer, editor, outsider, project };
}

// ---------------------------------------------------------------------------
// Authentication gate
// ---------------------------------------------------------------------------
test('GET /projects/:id without a token -> 401', async () => {
    const res = await request(app).get(`/api/projects/${FAKE_UUID}`);
    assert.equal(res.status, 401);
});

// ---------------------------------------------------------------------------
// Membership / role matrix
// ---------------------------------------------------------------------------
test('non-member GET project -> 404 (existence hidden)', async () => {
    const { outsider, project } = await setupRoles();
    const res = await request(app)
        .get(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${outsider.accessToken}`);
    assert.equal(res.status, 404);
});

test('VIEWER: GET 200, PUT 403', async () => {
    const { viewer, project } = await setupRoles();

    const get = await request(app)
        .get(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${viewer.accessToken}`);
    assert.equal(get.status, 200);
    assert.equal(get.body.project.id, project.id);

    const put = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${viewer.accessToken}`)
        .send({ name: 'Renamed' });
    assert.equal(put.status, 403);
});

test('EDITOR: PUT 200 but DELETE project 403', async () => {
    const { editor, project } = await setupRoles();

    const put = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${editor.accessToken}`)
        .send({ name: 'Edited Name' });
    assert.equal(put.status, 200);
    assert.equal(put.body.project.name, 'Edited Name');

    const del = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${editor.accessToken}`);
    assert.equal(del.status, 403);
});

test('OWNER: DELETE project -> 204', async () => {
    const { owner, project } = await setupRoles();
    const res = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(res.status, 204);
});

// ---------------------------------------------------------------------------
// GET /projects returns owned + shared
// ---------------------------------------------------------------------------
test('GET /projects returns both owned and shared projects', async () => {
    const { viewer, project } = await setupRoles();

    // viewer owns nothing but is a VIEWER on `project`.
    const res = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${viewer.accessToken}`);
    assert.equal(res.status, 200);
    const ids = res.body.projects.map((p) => p.id);
    assert.ok(ids.includes(project.id));
    // The shared project carries the caller's role.
    const shared = res.body.projects.find((p) => p.id === project.id);
    assert.equal(shared.role, 'VIEWER');
});

// ---------------------------------------------------------------------------
// Cascade: deleting a project removes its members and scenes
// ---------------------------------------------------------------------------
test('DELETE project cascades to members and scenes', async () => {
    const { owner, project } = await setupRoles();
    await createScene(app, owner.accessToken, project.id, { name: 'S1' });

    // Sanity: rows exist before the delete.
    assert.ok((await prisma.scene.count({ where: { projectId: project.id } })) > 0);
    assert.ok((await prisma.projectMember.count({ where: { projectId: project.id } })) > 0);

    const del = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(del.status, 204);

    assert.equal(await prisma.scene.count({ where: { projectId: project.id } }), 0);
    assert.equal(await prisma.projectMember.count({ where: { projectId: project.id } }), 0);
    assert.equal(await prisma.project.count({ where: { id: project.id } }), 0);
});

// ---------------------------------------------------------------------------
// create validation still applies end-to-end
// ---------------------------------------------------------------------------
test('POST /projects: 400 on empty name', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${owner.accessToken}`)
        .send({ name: '   ' });
    assert.equal(res.status, 400);
});
