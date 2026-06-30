import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../helpers/app.js';
import { resetDb, disconnectDb } from '../helpers/db.js';
import { registerAndLogin } from '../helpers/auth.js';
import { createProject, addMember, createScene } from '../helpers/factories.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

async function setupRoles() {
    const owner = await registerAndLogin(app, { email: 'owner@example.com' });
    const viewer = await registerAndLogin(app, { email: 'viewer@example.com' });
    const editor = await registerAndLogin(app, { email: 'editor@example.com' });
    const outsider = await registerAndLogin(app, { email: 'outsider@example.com' });

    const project = await createProject(app, owner.accessToken);
    await addMember(app, owner.accessToken, project.id, { email: 'viewer@example.com', role: 'VIEWER' });
    await addMember(app, owner.accessToken, project.id, { email: 'editor@example.com', role: 'EDITOR' });

    return { owner, viewer, editor, outsider, project };
}

const bearer = (t) => ['Authorization', `Bearer ${t}`];

// ---------------------------------------------------------------------------
// Auth + membership gates
// ---------------------------------------------------------------------------
test('GET scenes without a token -> 401', async () => {
    const res = await request(app).get('/api/projects/99999999-9999-4999-8999-999999999999/scenes');
    assert.equal(res.status, 401);
});

test('non-member listing scenes -> 404', async () => {
    const { outsider, project } = await setupRoles();
    const res = await request(app).get(`/api/projects/${project.id}/scenes`).set(...bearer(outsider.accessToken));
    assert.equal(res.status, 404);
});

// ---------------------------------------------------------------------------
// VIEWER: can read, cannot create
// ---------------------------------------------------------------------------
test('VIEWER: GET scenes 200, POST scene 403', async () => {
    const { owner, viewer, project } = await setupRoles();
    await createScene(app, owner.accessToken, project.id, { name: 'S1' });

    const list = await request(app).get(`/api/projects/${project.id}/scenes`).set(...bearer(viewer.accessToken));
    assert.equal(list.status, 200);
    assert.equal(list.body.scenes.length, 1);

    const post = await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set(...bearer(viewer.accessToken))
        .send({ name: 'Nope' });
    assert.equal(post.status, 403);
});

// ---------------------------------------------------------------------------
// EDITOR: full scene CRUD
// ---------------------------------------------------------------------------
test('EDITOR: can create, read, update and delete a scene', async () => {
    const { editor, project } = await setupRoles();

    const created = await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set(...bearer(editor.accessToken))
        .send({ name: 'Level 1', data: { tiles: 3 } });
    assert.equal(created.status, 201);
    const sceneId = created.body.scene.id;

    const got = await request(app)
        .get(`/api/projects/${project.id}/scenes/${sceneId}`)
        .set(...bearer(editor.accessToken));
    assert.equal(got.status, 200);
    assert.equal(got.body.scene.name, 'Level 1');

    const updated = await request(app)
        .put(`/api/projects/${project.id}/scenes/${sceneId}`)
        .set(...bearer(editor.accessToken))
        .send({ name: 'Level 1 - edited' });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.scene.name, 'Level 1 - edited');

    const deleted = await request(app)
        .delete(`/api/projects/${project.id}/scenes/${sceneId}`)
        .set(...bearer(editor.accessToken));
    assert.equal(deleted.status, 204);

    const gone = await request(app)
        .get(`/api/projects/${project.id}/scenes/${sceneId}`)
        .set(...bearer(editor.accessToken));
    assert.equal(gone.status, 404);
});

// ---------------------------------------------------------------------------
// Cross-project integrity: a scene id from another project must 404
// ---------------------------------------------------------------------------
test('scene id belonging to another project -> 404', async () => {
    const { owner, editor, project } = await setupRoles();

    // A second project owned by the same user, with its own scene.
    const otherProject = await createProject(app, owner.accessToken, { name: 'Other' });
    const otherScene = await createScene(app, owner.accessToken, otherProject.id, { name: 'Foreign' });

    // Ask for the foreign scene id under the first project -> not found.
    const res = await request(app)
        .get(`/api/projects/${project.id}/scenes/${otherScene.id}`)
        .set(...bearer(editor.accessToken));
    assert.equal(res.status, 404);
});

// ---------------------------------------------------------------------------
// Validation end-to-end
// ---------------------------------------------------------------------------
test('POST scene: 400 on missing name', async () => {
    const { editor, project } = await setupRoles();
    const res = await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set(...bearer(editor.accessToken))
        .send({ data: {} });
    assert.equal(res.status, 400);
});

test('GET scene: 400 on malformed scene UUID', async () => {
    const { editor, project } = await setupRoles();
    const res = await request(app)
        .get(`/api/projects/${project.id}/scenes/not-a-uuid`)
        .set(...bearer(editor.accessToken));
    assert.equal(res.status, 400);
});
