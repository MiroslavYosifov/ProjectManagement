import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import crypto from 'node:crypto';

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

test('EDITOR: can delete a scene (204) but cannot delete the project (403)', async () => {
    const { editor, project } = await setupRoles();
    const scene = await createScene(app, editor.accessToken, project.id, { name: 'Editor scene' });

    const deleteScene = await request(app)
        .delete(`/api/projects/${project.id}/scenes/${scene.id}`)
        .set('Authorization', `Bearer ${editor.accessToken}`);
    assert.equal(deleteScene.status, 204);

    const deleteProject = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${editor.accessToken}`);
    assert.equal(deleteProject.status, 403);
});

test('project existence is hidden identically for a nonexistent id and a real id the caller cannot see', async () => {
    const { outsider, project } = await setupRoles();

    const nonexistent = await request(app)
        .get(`/api/projects/${FAKE_UUID}`)
        .set('Authorization', `Bearer ${outsider.accessToken}`);
    const notAMember = await request(app)
        .get(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${outsider.accessToken}`);

    assert.equal(nonexistent.status, 404);
    assert.equal(notAMember.status, 404);
    assert.deepEqual(nonexistent.body, notAMember.body);
    assert.deepEqual(nonexistent.body, { message: 'Project not found' });
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

test('POST /projects: 400 on name over 100 characters', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${owner.accessToken}`)
        .send({ name: 'x'.repeat(101) });
    assert.equal(res.status, 400);
});

test('POST /projects: 400 on description over 1000 characters', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${owner.accessToken}`)
        .send({ name: 'Valid name', description: 'x'.repeat(1001) });
    assert.equal(res.status, 400);
});

// ---------------------------------------------------------------------------
// GET /projects pagination
// ---------------------------------------------------------------------------
test('GET /projects: page/limit slice results, most recently created first', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    await createProject(app, owner.accessToken, { name: 'P1' });
    await createProject(app, owner.accessToken, { name: 'P2' });
    await createProject(app, owner.accessToken, { name: 'P3' });

    const page1 = await request(app)
        .get('/api/projects?page=1&limit=2')
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(page1.status, 200);
    assert.equal(page1.body.projects.length, 2);
    assert.deepEqual(page1.body.projects.map((p) => p.name), ['P3', 'P2']);

    const page2 = await request(app)
        .get('/api/projects?page=2&limit=2')
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(page2.status, 200);
    assert.equal(page2.body.projects.length, 1);
    assert.equal(page2.body.projects[0].name, 'P1');
});

test('GET /projects: a negative limit is clamped to a minimum of 1', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    await createProject(app, owner.accessToken, { name: 'P1' });
    await createProject(app, owner.accessToken, { name: 'P2' });

    const res = await request(app)
        .get('/api/projects?limit=-5')
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.projects.length, 1);
});

test('GET /projects: page=0 and an oversized limit are clamped, not rejected', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    await createProject(app, owner.accessToken, { name: 'P1' });
    await createProject(app, owner.accessToken, { name: 'P2' });
    await createProject(app, owner.accessToken, { name: 'P3' });

    const res = await request(app)
        .get('/api/projects?page=0&limit=500')
        .set('Authorization', `Bearer ${owner.accessToken}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.projects.length, 3);
});

// ---------------------------------------------------------------------------
// Per-user project limit
// ---------------------------------------------------------------------------
test('POST /projects: 409 once a user reaches the per-user project limit', async () => {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });

    // Seed 20 (MAX_PROJECTS_PER_USER) projects directly instead of 20 real
    // HTTP round trips.
    const ids = Array.from({ length: 20 }, () => crypto.randomUUID());
    await prisma.project.createMany({
        data: ids.map((id) => ({ id, userId: owner.user.id, name: `Seed ${id}` })),
    });
    await prisma.projectMember.createMany({
        data: ids.map((id) => ({ projectId: id, userId: owner.user.id, role: 'OWNER' })),
    });

    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${owner.accessToken}`)
        .send({ name: 'One too many' });
    assert.equal(res.status, 409);
});
