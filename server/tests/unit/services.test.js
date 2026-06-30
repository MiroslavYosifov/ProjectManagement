import { test, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import { ScenesService } from '../../services/scenes/index.js';
import { ProjectsService } from '../../services/projects/index.js';
import { ScenesRepository } from '../../repository/scenes/index.js';
import { ProjectsRepository } from '../../repository/projects/index.js';
import { ProjectMembersRepository } from '../../repository/projectMembers/index.js';
import { prisma } from '../../db/prisma.js';

// prisma is a Proxy whose $transaction can't be wrapped by mock.method, so we
// swap it by hand and restore it afterwards. It just runs the callback with a
// dummy tx client (the repository calls underneath are mocked anyway).
let originalTransaction;
function stubTransaction() {
    originalTransaction = prisma.$transaction;
    prisma.$transaction = async (cb) => cb({});
}

afterEach(() => {
    mock.restoreAll();
    if (originalTransaction) {
        prisma.$transaction = originalTransaction;
        originalTransaction = undefined;
    }
});

// ---------------------------------------------------------------------------
// ScenesService.getById -> findSceneInProject integrity guard
// A scene id that exists but belongs to a different project must 404, so a
// caller can't read scenes across projects by guessing ids.
// ---------------------------------------------------------------------------
test('ScenesService.getById: scene from another project -> 404', async () => {
    mock.method(ScenesRepository, 'findById', async () => ({
        id: 'scene-1',
        project_id: 'OTHER-project',
        name: 'foreign scene',
    }));

    await assert.rejects(
        () => ScenesService.getById({ projectId: 'my-project', sceneId: 'scene-1' }),
        (err) => {
            assert.equal(err.status, 404);
            assert.match(err.message, /not found/i);
            return true;
        }
    );
});

test('ScenesService.getById: missing scene -> 404', async () => {
    mock.method(ScenesRepository, 'findById', async () => null);
    await assert.rejects(
        () => ScenesService.getById({ projectId: 'my-project', sceneId: 'scene-1' }),
        (err) => err.status === 404
    );
});

test('ScenesService.getById: scene in the same project is returned', async () => {
    const scene = { id: 'scene-1', project_id: 'my-project', name: 'ok' };
    mock.method(ScenesRepository, 'findById', async () => scene);
    const result = await ScenesService.getById({ projectId: 'my-project', sceneId: 'scene-1' });
    assert.deepEqual(result, scene);
});

// ---------------------------------------------------------------------------
// ProjectsService.create -> creator becomes OWNER
// ---------------------------------------------------------------------------
test('ProjectsService.create: makes the creator an OWNER member', async () => {
    // Run the transaction callback immediately with a dummy tx client.
    stubTransaction();
    mock.method(ProjectsRepository, 'countByUser', async () => 0);
    mock.method(ProjectsRepository, 'create', async () => ({ id: 'project-1', name: 'New' }));
    const memberCreate = mock.method(ProjectMembersRepository, 'create', async () => ({}));

    const project = await ProjectsService.create({
        userId: 'user-1',
        data: { name: 'New', description: null },
    });

    assert.equal(project.id, 'project-1');
    assert.equal(memberCreate.mock.calls.length, 1);
    // First positional arg is the membership payload.
    const payload = memberCreate.mock.calls[0].arguments[0];
    assert.equal(payload.projectId, 'project-1');
    assert.equal(payload.userId, 'user-1');
    assert.equal(payload.role, 'OWNER');
});

test('ProjectsService.create: enforces the per-user project limit', async () => {
    stubTransaction();
    mock.method(ProjectsRepository, 'countByUser', async () => 20); // at the cap
    const createSpy = mock.method(ProjectsRepository, 'create', async () => ({ id: 'x' }));

    await assert.rejects(
        () => ProjectsService.create({ userId: 'user-1', data: { name: 'New' } }),
        (err) => err.status === 409
    );
    assert.equal(createSpy.mock.calls.length, 0); // never reached create
});
