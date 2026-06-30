import request from 'supertest';

// Thin wrappers over the real endpoints so authz tests can set up an
// owner/editor/viewer scenario without repeating supertest boilerplate.

export async function createProject(app, token, { name = 'Test Project', description } = {}) {
    const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, description });
    if (res.status !== 201) {
        throw new Error(`createProject failed (${res.status}): ${res.text}`);
    }
    return res.body.project;
}

export async function addMember(app, ownerToken, projectId, { email, role }) {
    return request(app)
        .post(`/api/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({ email, role });
}

export async function createScene(app, token, projectId, { name = 'Scene', data } = {}) {
    const res = await request(app)
        .post(`/api/projects/${projectId}/scenes`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name, data });
    if (res.status !== 201) {
        throw new Error(`createScene failed (${res.status}): ${res.text}`);
    }
    return res.body.scene;
}
