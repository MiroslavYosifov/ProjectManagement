import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

async function registerAndLogin(email) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return res.body.accessToken;
}

async function createProject(token, body = { name: 'Test Project' }) {
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    return res.body.project;
}

async function addMember(ownerToken, projectId, email, role) {
    return request(app)
        .post(`/api/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({ email, role });
}

test('user can create a project', async () => {
    const token = await registerAndLogin('owner@test.com');

    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'My Project', description: 'A test project' });

    assert.equal(res.status, 201);
    assert.ok(res.body.project.id);
    assert.equal(res.body.project.name, 'My Project');
    assert.equal(res.body.project.description, 'A test project');
});

test('created project has correct owner', async () => {
    const token = await registerAndLogin('owner2@test.com');
    const user = await prisma.user.findUnique({ where: { email: 'owner2@test.com' } });
    const project = await createProject(token);

    assert.equal(project.user_id, user.id);

    const membership = await prisma.projectMember.findUnique({
        where: { projectId_userId: { projectId: project.id, userId: user.id } },
    });
    assert.equal(membership.role, 'OWNER');
});

test('user can list only projects where he is a member', async () => {
    const tokenA = await registerAndLogin('listA@test.com');
    const tokenB = await registerAndLogin('listB@test.com');
    await createProject(tokenA, { name: "A's project" });

    const resA = await request(app).get('/api/projects').set('Authorization', `Bearer ${tokenA}`);
    const resB = await request(app).get('/api/projects').set('Authorization', `Bearer ${tokenB}`);

    assert.equal(resA.body.projects.length, 1);
    assert.equal(resA.body.projects[0].name, "A's project");
    assert.equal(resB.body.projects.length, 0);
});

test('user can get a project he is a member of', async () => {
    const token = await registerAndLogin('getowner@test.com');
    const project = await createProject(token);

    const res = await request(app)
        .get(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.project.id, project.id);
});

test('user cannot get a project he has no membership in', async () => {
    const ownerToken = await registerAndLogin('privateowner@test.com');
    const outsiderToken = await registerAndLogin('outsider@test.com');
    const project = await createProject(ownerToken);

    const res = await request(app)
        .get(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${outsiderToken}`);

    assert.equal(res.status, 404);
});

test('owner can update the project', async () => {
    const token = await registerAndLogin('updateowner@test.com');
    const project = await createProject(token);

    const res = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Renamed by owner' });

    assert.equal(res.status, 200);
    assert.equal(res.body.project.name, 'Renamed by owner');
});

test('editor can update the project', async () => {
    const ownerToken = await registerAndLogin('editorowner@test.com');
    const editorEmail = 'editoruser@test.com';
    const editorToken = await registerAndLogin(editorEmail);
    const project = await createProject(ownerToken);
    await addMember(ownerToken, project.id, editorEmail, 'EDITOR');

    const res = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${editorToken}`)
        .send({ name: 'Renamed by editor' });

    assert.equal(res.status, 200);
    assert.equal(res.body.project.name, 'Renamed by editor');
});

test('viewer cannot update the project', async () => {
    const ownerToken = await registerAndLogin('viewerowner@test.com');
    const viewerEmail = 'vieweruser@test.com';
    const viewerToken = await registerAndLogin(viewerEmail);
    const project = await createProject(ownerToken);
    await addMember(ownerToken, project.id, viewerEmail, 'VIEWER');

    const res = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'Should not be applied' });

    assert.equal(res.status, 403);

    const project_ = await prisma.project.findUnique({ where: { id: project.id } });
    assert.equal(project_.name, project.name);
});

test('only the owner can delete the project', async () => {
    const ownerToken = await registerAndLogin('deleteowner@test.com');
    const editorEmail = 'deleteeditor@test.com';
    const editorToken = await registerAndLogin(editorEmail);
    const project = await createProject(ownerToken);
    await addMember(ownerToken, project.id, editorEmail, 'EDITOR');

    const editorAttempt = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${editorToken}`);
    assert.equal(editorAttempt.status, 403);

    const ownerAttempt = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${ownerToken}`);
    assert.equal(ownerAttempt.status, 204);

    const project_ = await prisma.project.findUnique({ where: { id: project.id } });
    assert.equal(project_, null);
});

test('deleting a project removes its scenes and memberships', async () => {
    const ownerToken = await registerAndLogin('cascadeowner@test.com');
    const memberEmail = 'cascademember@test.com';
    await registerAndLogin(memberEmail);
    const project = await createProject(ownerToken);
    await addMember(ownerToken, project.id, memberEmail, 'VIEWER');
    await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({ name: 'Scene 1' });

    const deleteRes = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${ownerToken}`);
    assert.equal(deleteRes.status, 204);

    const scenes = await prisma.scene.findMany({ where: { projectId: project.id } });
    const members = await prisma.projectMember.findMany({ where: { projectId: project.id } });

    assert.equal(scenes.length, 0);
    assert.equal(members.length, 0);
});
