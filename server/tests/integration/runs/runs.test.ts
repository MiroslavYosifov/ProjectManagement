import { test, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { ENGINE_VERSION, Recorder, Replayer, Simulation, type RecordingChunk, type SceneSetup } from '@simulation-engine/core';

import { app } from '../../helpers/app.js';
import { resetDb, disconnectDb, prisma } from '../../helpers/db.js';
import { HEARTBEAT_TIMEOUT_MS } from '../../../services/runs/index.js';

before(resetDb);
beforeEach(resetDb);
after(disconnectDb);

const setup: SceneSetup = {
    version: 1,
    seed: 3,
    entities: [
        {
            position: { x: 0, y: 0 },
            movement: { velocityX: 12.5, velocityY: -3 },
            appearance: { kind: 'circle', color: 0xff0000, radius: 5 },
        },
    ],
};

async function registerAndLogin(email: string) {
    const credentials = { email, username: email.split('@')[0], password: 'Password123!' };
    await request(app).post('/api/auth/register').send(credentials);
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: credentials.email, password: credentials.password });
    return { token: res.body.accessToken as string };
}

async function addMember(token: string, projectId: string, email: string, role: string) {
    return request(app)
        .post(`/api/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email, role });
}

async function createSceneFixture() {
    const owner = await registerAndLogin('owner@test.com');
    const project = (await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ name: 'Project' })).body.project;
    const scene = (await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ name: 'Scene', data: setup })).body.scene;
    const runsUrl = `/api/projects/${project.id}/scenes/${scene.id}/runs`;
    return { owner, project, scene, runsUrl };
}

async function startRun(token: string, runsUrl: string) {
    const res = await request(app)
        .post(runsUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ setup, engine_version: ENGINE_VERSION });
    assert.equal(res.status, 201);
    return res.body.run;
}

function recordChunks(ticks: number) {
    const chunks: RecordingChunk[] = [];
    const recorder = new Recorder(Simulation.create(setup), (chunk) => chunks.push(chunk), {
        checkpointInterval: 100,
        metricsInterval: 20,
        chunkTicks: 60,
    });
    for (let tick = 0; tick < ticks; tick++) {
        if (tick === 50) recorder.enqueue({ type: 'spawnEntity', entity: setup.entities[0] });
        if (tick === 170) recorder.enqueue({ type: 'removeEntity', id: 1 });
        recorder.step();
    }
    recorder.finish();
    return chunks;
}

async function upload(token: string, runUrl: string, chunk: RecordingChunk) {
    return request(app)
        .post(`${runUrl}/chunks`)
        .set('Authorization', `Bearer ${token}`)
        .send(chunk);
}

test('a recorded run can be uploaded in chunks and replayed from the server', async () => {
    const { owner, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    const runUrl = `${runsUrl}/${run.id}`;
    assert.equal(run.status, 'running');

    const chunks = recordChunks(400);
    for (const chunk of chunks) {
        const res = await upload(owner.token, runUrl, chunk);
        assert.equal(res.status, 200);
        assert.equal(res.body.last_tick, chunk.toTick);
    }

    const finished = await request(app).post(`${runUrl}/finish`).set('Authorization', `Bearer ${owner.token}`);
    assert.equal(finished.status, 200);
    assert.equal(finished.body.run.status, 'completed');
    assert.equal(finished.body.run.last_tick, 400);

    const checkpoint = await request(app)
        .get(`${runUrl}/checkpoint?atOrBefore=250`)
        .set('Authorization', `Bearer ${owner.token}`);
    assert.equal(checkpoint.status, 200);
    assert.equal(checkpoint.body.checkpoint.tick, 200);

    const commands = await request(app)
        .get(`${runUrl}/commands?fromTick=0&toTick=400`)
        .set('Authorization', `Bearer ${owner.token}`);
    assert.deepEqual(commands.body.commands.map((c: { tick: number }) => c.tick), [50, 170]);
    assert.deepEqual(commands.body.events.map((e: { type: string }) => e.type), ['entitySpawned', 'entityRemoved']);

    const final = await request(app)
        .get(`${runUrl}/checkpoint`)
        .set('Authorization', `Bearer ${owner.token}`);
    const replayer = new Replayer(checkpoint.body.checkpoint, commands.body.commands);
    replayer.advanceTo(400);
    assert.ok(replayer.matches(final.body.checkpoint));
});

test('re-uploading a chunk with the same seq does not duplicate data', async () => {
    const { owner, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    const runUrl = `${runsUrl}/${run.id}`;
    const [first] = recordChunks(60);

    assert.equal((await upload(owner.token, runUrl, first)).status, 200);
    assert.equal((await upload(owner.token, runUrl, first)).status, 200);

    assert.equal(await prisma.simulationRunChunk.count({ where: { runId: run.id } }), 1);
    assert.equal(await prisma.simulationCheckpoint.count({ where: { runId: run.id } }), 1);
    assert.equal(await prisma.simulationMetric.count({ where: { runId: run.id } }), 3);
});

test('metrics can be read by range and downsampled', async () => {
    const { owner, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    const runUrl = `${runsUrl}/${run.id}`;
    for (const chunk of recordChunks(400)) await upload(owner.token, runUrl, chunk);

    const res = await request(app)
        .get(`${runUrl}/metrics?fromTick=100&toTick=300&step=40`)
        .set('Authorization', `Bearer ${owner.token}`);

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.metrics.map((m: { tick: number }) => m.tick), [100, 140, 180, 220, 260]);
    assert.equal(res.body.metrics[0].values.entityCount, 2);
});

test('a run without a recent heartbeat is reported as interrupted', async () => {
    const { owner, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    await prisma.simulationRun.update({
        where: { id: run.id },
        data: { lastHeartbeatAt: new Date(Date.now() - HEARTBEAT_TIMEOUT_MS - 1000) },
    });

    const list = await request(app).get(runsUrl).set('Authorization', `Bearer ${owner.token}`);
    assert.equal(list.body.runs[0].status, 'interrupted');

    const [first] = recordChunks(60);
    await upload(owner.token, `${runsUrl}/${run.id}`, first);
    const resumed = await request(app).get(`${runsUrl}/${run.id}`).set('Authorization', `Bearer ${owner.token}`);
    assert.equal(resumed.body.run.status, 'running');
});

test('completed runs reject new chunks', async () => {
    const { owner, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    const runUrl = `${runsUrl}/${run.id}`;
    await request(app).post(`${runUrl}/finish`).set('Authorization', `Bearer ${owner.token}`);

    const [first] = recordChunks(60);
    assert.equal((await upload(owner.token, runUrl, first)).status, 409);
});

test('invalid runs and chunks are rejected', async () => {
    const { owner, runsUrl } = await createSceneFixture();

    const badSetup = await request(app)
        .post(runsUrl)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ setup: { objects: [] }, engine_version: ENGINE_VERSION });
    assert.equal(badSetup.status, 400);

    const badVersion = await request(app)
        .post(runsUrl)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ setup, engine_version: ENGINE_VERSION + 1 });
    assert.equal(badVersion.status, 400);

    const run = await startRun(owner.token, runsUrl);
    const [first] = recordChunks(60);
    const outside = { ...first, commands: [{ tick: first.toTick + 5, command: { type: 'removeEntity', id: 1 } }] };
    assert.equal((await upload(owner.token, `${runsUrl}/${run.id}`, outside as RecordingChunk)).status, 400);
});

test('viewers can read runs but cannot record them', async () => {
    const { owner, project, runsUrl } = await createSceneFixture();
    const viewer = await registerAndLogin('viewer@test.com');
    await addMember(owner.token, project.id, 'viewer@test.com', 'VIEWER');
    const run = await startRun(owner.token, runsUrl);

    const list = await request(app).get(runsUrl).set('Authorization', `Bearer ${viewer.token}`);
    assert.equal(list.status, 200);
    assert.equal(list.body.runs.length, 1);

    const create = await request(app)
        .post(runsUrl)
        .set('Authorization', `Bearer ${viewer.token}`)
        .send({ setup, engine_version: ENGINE_VERSION });
    assert.equal(create.status, 403);

    const [first] = recordChunks(60);
    assert.equal((await upload(viewer.token, `${runsUrl}/${run.id}`, first)).status, 403);
});

test('runs of another scene are not reachable', async () => {
    const { owner, project, runsUrl } = await createSceneFixture();
    const run = await startRun(owner.token, runsUrl);
    const other = (await request(app)
        .post(`/api/projects/${project.id}/scenes`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ name: 'Other', data: setup })).body.scene;

    const res = await request(app)
        .get(`/api/projects/${project.id}/scenes/${other.id}/runs/${run.id}`)
        .set('Authorization', `Bearer ${owner.token}`);
    assert.equal(res.status, 404);
});
