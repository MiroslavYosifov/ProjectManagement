import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import request from 'supertest';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

const MAX_SCENES = 100;

async function registerAndLogin(email) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return { token: res.body.accessToken, userId: res.body.user.id };
}

async function createProject(token, body = { name: 'Test Project' }) {
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    return res.body.project;
}

async function addMember(token, projectId, email, role) {
    return request(app)
        .post(`/api/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email, role });
}

async function createScene(token, projectId, body = { name: 'Scene', data: { objects: [] } }) {
    return request(app)
        .post(`/api/projects/${projectId}/scenes`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);
}

function sceneUrl(projectId, sceneId) {
    return `/api/projects/${projectId}/scenes/${sceneId}`;
}

async function seedScenes(projectId, count) {
    await prisma.scene.createMany({
        data: Array.from({ length: count }, (_, i) => ({ projectId, name: `Scene ${i}` })),
    });
}

test('editor can create a scene', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const editor = await registerAndLogin('editor@test.com');
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, 'editor@test.com', 'EDITOR');

    const res = await createScene(editor.token, project.id, { name: '  Level 1  ', data: { objects: [1] } });

    assert.equal(res.status, 201);
    assert.equal(res.body.scene.project_id, project.id);
    assert.equal(res.body.scene.name, 'Level 1');
    assert.deepEqual(res.body.scene.data, { objects: [1] });

    const row = await prisma.scene.findUnique({ where: { id: res.body.scene.id } });
    assert.equal(row.projectId, project.id);
    assert.deepEqual(row.data, { objects: [1] });
});

test('scene data defaults to an empty object', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    const res = await createScene(owner.token, project.id, { name: 'Empty' });

    assert.equal(res.status, 201);
    assert.deepEqual(res.body.scene.data, {});
});

test('viewer can list and read scenes', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const viewer = await registerAndLogin('viewer@test.com');
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, 'viewer@test.com', 'VIEWER');
    const { body: { scene } } = await createScene(owner.token, project.id);

    const list = await request(app)
        .get(`/api/projects/${project.id}/scenes`)
        .set('Authorization', `Bearer ${viewer.token}`);
    assert.equal(list.status, 200);
    assert.deepEqual(list.body.scenes.map((s) => s.id), [scene.id]);

    const one = await request(app)
        .get(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${viewer.token}`);
    assert.equal(one.status, 200);
    assert.equal(one.body.scene.id, scene.id);
});

test('viewer cannot update or delete scenes', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const viewer = await registerAndLogin('viewer@test.com');
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, 'viewer@test.com', 'VIEWER');
    const { body: { scene } } = await createScene(owner.token, project.id);

    const update = await request(app)
        .put(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${viewer.token}`)
        .send({ name: 'Hacked' });
    assert.equal(update.status, 403);

    const remove = await request(app)
        .delete(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${viewer.token}`);
    assert.equal(remove.status, 403);

    const row = await prisma.scene.findUnique({ where: { id: scene.id } });
    assert.equal(row.name, 'Scene');
});

test('non-member cannot read scenes of a project', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const outsider = await registerAndLogin('outsider@test.com');
    const project = await createProject(owner.token);
    const { body: { scene } } = await createScene(owner.token, project.id);

    const res = await request(app)
        .get(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${outsider.token}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.scene, undefined);
});

test('cannot access a scene from another project through a project the user belongs to', async () => {
    const victim = await registerAndLogin('victim@test.com');
    const attacker = await registerAndLogin('attacker@test.com');
    const victimProject = await createProject(victim.token, { name: 'Victim' });
    const attackerProject = await createProject(attacker.token, { name: 'Attacker' });
    const { body: { scene } } = await createScene(victim.token, victimProject.id, { name: 'Secret', data: { secret: true } });

    const read = await request(app)
        .get(sceneUrl(attackerProject.id, scene.id))
        .set('Authorization', `Bearer ${attacker.token}`);
    assert.equal(read.status, 404);
    assert.equal(read.body.scene, undefined);

    const update = await request(app)
        .put(sceneUrl(attackerProject.id, scene.id))
        .set('Authorization', `Bearer ${attacker.token}`)
        .send({ name: 'Stolen', data: {} });
    assert.equal(update.status, 404);

    const remove = await request(app)
        .delete(sceneUrl(attackerProject.id, scene.id))
        .set('Authorization', `Bearer ${attacker.token}`);
    assert.equal(remove.status, 404);

    const row = await prisma.scene.findUnique({ where: { id: scene.id } });
    assert.equal(row.name, 'Secret');
    assert.deepEqual(row.data, { secret: true });
    assert.equal(row.projectId, victimProject.id);
});

test('listing scenes only returns scenes of that project', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const projectA = await createProject(owner.token, { name: 'A' });
    const projectB = await createProject(owner.token, { name: 'B' });
    const { body: { scene: sceneA } } = await createScene(owner.token, projectA.id, { name: 'A1' });
    await createScene(owner.token, projectB.id, { name: 'B1' });

    const res = await request(app)
        .get(`/api/projects/${projectA.id}/scenes`)
        .set('Authorization', `Bearer ${owner.token}`);

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.scenes.map((s) => s.id), [sceneA.id]);
});

test('the last scene within the limit can be created', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);
    await seedScenes(project.id, MAX_SCENES - 1);

    const res = await createScene(owner.token, project.id);

    assert.equal(res.status, 201);
    assert.equal(await prisma.scene.count({ where: { projectId: project.id } }), MAX_SCENES);
});

test('creating a scene beyond the limit returns 409', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);
    await seedScenes(project.id, MAX_SCENES);

    const res = await createScene(owner.token, project.id);

    assert.equal(res.status, 409);
    assert.equal(res.body.message, `Scene limit reached (max ${MAX_SCENES} per project)`);
    assert.equal(await prisma.scene.count({ where: { projectId: project.id } }), MAX_SCENES);
});

test('the scene limit is per project', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const full = await createProject(owner.token, { name: 'Full' });
    const empty = await createProject(owner.token, { name: 'Empty' });
    await seedScenes(full.id, MAX_SCENES);

    const res = await createScene(owner.token, empty.id);

    assert.equal(res.status, 201);
});

test('editor can update a scene name and data', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const editor = await registerAndLogin('editor@test.com');
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, 'editor@test.com', 'EDITOR');
    const { body: { scene } } = await createScene(owner.token, project.id);

    const res = await request(app)
        .put(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${editor.token}`)
        .send({ name: '  Renamed  ', data: { objects: [{ id: 1 }] } });

    assert.equal(res.status, 200);
    assert.equal(res.body.scene.name, 'Renamed');
    assert.deepEqual(res.body.scene.data, { objects: [{ id: 1 }] });

    const row = await prisma.scene.findUnique({ where: { id: scene.id } });
    assert.equal(row.name, 'Renamed');
    assert.deepEqual(row.data, { objects: [{ id: 1 }] });
});

test('partial update keeps the fields that were not sent', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);
    const { body: { scene } } = await createScene(owner.token, project.id, { name: 'Original', data: { keep: true } });

    const res = await request(app)
        .put(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ name: 'Renamed' });

    assert.equal(res.status, 200);
    const row = await prisma.scene.findUnique({ where: { id: scene.id } });
    assert.equal(row.name, 'Renamed');
    assert.deepEqual(row.data, { keep: true });
});

test('update is rejected when the body is empty or invalid', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);
    const { body: { scene } } = await createScene(owner.token, project.id);

    for (const body of [{}, { name: '   ' }, { name: 'a'.repeat(101) }, { data: [1, 2] }, { data: 'text' }]) {
        const res = await request(app)
            .put(sceneUrl(project.id, scene.id))
            .set('Authorization', `Bearer ${owner.token}`)
            .send(body);
        assert.equal(res.status, 400, JSON.stringify(body));
    }

    const row = await prisma.scene.findUnique({ where: { id: scene.id } });
    assert.equal(row.name, 'Scene');
});

test('create is rejected when the name or data is invalid', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    for (const body of [{}, { name: '' }, { name: 123 }, { name: 'ok', data: [] }, { name: 'ok', data: null }]) {
        const res = await createScene(owner.token, project.id, body);
        assert.equal(res.status, 400, JSON.stringify(body));
    }

    assert.equal(await prisma.scene.count({ where: { projectId: project.id } }), 0);
});

test('editor can delete a scene', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const editor = await registerAndLogin('editor@test.com');
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, 'editor@test.com', 'EDITOR');
    const { body: { scene } } = await createScene(owner.token, project.id);

    const res = await request(app)
        .delete(sceneUrl(project.id, scene.id))
        .set('Authorization', `Bearer ${editor.token}`);

    assert.equal(res.status, 204);
    assert.equal(await prisma.scene.findUnique({ where: { id: scene.id } }), null);
});

test('reading, updating or deleting a missing scene returns 404', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);
    const missing = sceneUrl(project.id, crypto.randomUUID());
    const auth = ['Authorization', `Bearer ${owner.token}`];

    assert.equal((await request(app).get(missing).set(...auth)).status, 404);
    assert.equal((await request(app).put(missing).set(...auth).send({ name: 'x' })).status, 404);
    assert.equal((await request(app).delete(missing).set(...auth)).status, 404);
});

test('a non-uuid scene id returns 400', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    const res = await request(app)
        .get(sceneUrl(project.id, 'not-a-uuid'))
        .set('Authorization', `Bearer ${owner.token}`);

    assert.equal(res.status, 400);
});
