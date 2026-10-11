import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

async function registerAndLogin(email: string) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return { token: res.body.accessToken, userId: res.body.user.id };
}

async function createProject(token: string, body: object = { name: 'Test Project' }) {
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    return res.body.project;
}

async function addMember(token: string, projectId: string, email: string, role: string | undefined) {
    return request(app)
        .post(`/api/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email, role });
}

async function removeMember(token: string, projectId: string, userId: string) {
    return request(app)
        .delete(`/api/projects/${projectId}/members/${userId}`)
        .set('Authorization', `Bearer ${token}`);
}

async function findMembership(projectId: string, userId: string) {
    return prisma.projectMember.findUnique({
        where: { projectId_userId: { projectId, userId } },
    });
}

async function setupProjectWith(role: string) {
    const owner = await registerAndLogin('owner@test.com');
    const member = await registerAndLogin(`${role.toLowerCase()}@test.com`);
    const project = await createProject(owner.token);
    await addMember(owner.token, project.id, `${role.toLowerCase()}@test.com`, role);
    return { owner, member, project };
}

test('owner can add a member', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const viewer = await registerAndLogin('viewer@test.com');
    const project = await createProject(owner.token);

    const res = await addMember(owner.token, project.id, 'viewer@test.com', 'VIEWER');

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.member, { user_id: viewer.userId, email: 'viewer@test.com', role: 'VIEWER' });

    const membership = await findMembership(project.id, viewer.userId);
    assert.equal(membership?.role, 'VIEWER');
});

test('owner can change a member role', async () => {
    const { owner, member, project } = await setupProjectWith('VIEWER');

    const res = await addMember(owner.token, project.id, 'viewer@test.com', 'EDITOR');

    assert.equal(res.status, 200);
    assert.equal(res.body.member.role, 'EDITOR');

    const memberships = await prisma.projectMember.findMany({
        where: { projectId: project.id, userId: member.userId },
    });
    assert.equal(memberships.length, 1);
    assert.equal(memberships[0].role, 'EDITOR');
});

test('owner can remove a member', async () => {
    const { owner, member, project } = await setupProjectWith('VIEWER');

    const res = await removeMember(owner.token, project.id, member.userId);

    assert.equal(res.status, 204);
    assert.equal(await findMembership(project.id, member.userId), null);
});

test('any member can list the project members', async () => {
    const { owner, member, project } = await setupProjectWith('VIEWER');

    const res = await request(app)
        .get(`/api/projects/${project.id}/members`)
        .set('Authorization', `Bearer ${member.token}`);

    assert.equal(res.status, 200);
    const roles = Object.fromEntries(res.body.members.map((m: { user_id: string; role: string }) => [m.user_id, m.role]));
    assert.deepEqual(roles, { [owner.userId]: 'OWNER', [member.userId]: 'VIEWER' });
});

test('viewer cannot edit the project', async () => {
    const { member, project } = await setupProjectWith('VIEWER');

    const res = await request(app)
        .put(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${member.token}`)
        .send({ name: 'Hacked' });

    assert.equal(res.status, 403);

    const row = await prisma.project.findUnique({ where: { id: project.id } });
    assert.equal(row?.name, 'Test Project');
});

test('viewer cannot create scenes', async () => {
    const { member, project } = await setupProjectWith('VIEWER');

    const res = await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set('Authorization', `Bearer ${member.token}`)
        .send({ name: 'Scene' });

    assert.equal(res.status, 403);
    assert.equal(await prisma.scene.count({ where: { projectId: project.id } }), 0);
});

test('editor cannot delete the project', async () => {
    const { member, project } = await setupProjectWith('EDITOR');

    const res = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set('Authorization', `Bearer ${member.token}`);

    assert.equal(res.status, 403);
    assert.ok(await prisma.project.findUnique({ where: { id: project.id } }));
});

test('editor cannot add members', async () => {
    const { member, project } = await setupProjectWith('EDITOR');
    const outsider = await registerAndLogin('outsider@test.com');

    const res = await addMember(member.token, project.id, 'outsider@test.com', 'VIEWER');

    assert.equal(res.status, 403);
    assert.equal(await findMembership(project.id, outsider.userId), null);
});

test('editor cannot remove members', async () => {
    const { owner, member, project } = await setupProjectWith('EDITOR');
    const viewer = await registerAndLogin('viewer@test.com');
    await addMember(owner.token, project.id, 'viewer@test.com', 'VIEWER');

    const res = await removeMember(member.token, project.id, viewer.userId);

    assert.equal(res.status, 403);
    assert.ok(await findMembership(project.id, viewer.userId));
});

test('non-member gets 404 when managing members, without revealing the project exists', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const outsider = await registerAndLogin('outsider@test.com');
    const project = await createProject(owner.token);

    const res = await addMember(outsider.token, project.id, 'outsider@test.com', 'EDITOR');

    assert.equal(res.status, 404);
    assert.equal(await findMembership(project.id, outsider.userId), null);
});

test('owner role cannot be changed', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    const res = await addMember(owner.token, project.id, 'owner@test.com', 'VIEWER');

    assert.equal(res.status, 409);
    assert.equal((await findMembership(project.id, owner.userId))?.role, 'OWNER');
});

test('owner cannot be removed', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    const res = await removeMember(owner.token, project.id, owner.userId);

    assert.equal(res.status, 409);
    assert.ok(await findMembership(project.id, owner.userId));
});

test('adding an unknown email returns 404', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const project = await createProject(owner.token);

    const res = await addMember(owner.token, project.id, 'nobody@test.com', 'VIEWER');

    assert.equal(res.status, 404);
    assert.equal(res.body.message, 'User not found');
});

test('OWNER and unknown roles cannot be assigned', async () => {
    const owner = await registerAndLogin('owner@test.com');
    const other = await registerAndLogin('other@test.com');
    const project = await createProject(owner.token);

    for (const role of ['OWNER', 'ADMIN', undefined]) {
        const res = await addMember(owner.token, project.id, 'other@test.com', role);
        assert.equal(res.status, 400);
    }

    assert.equal(await findMembership(project.id, other.userId), null);
});
