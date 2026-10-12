import { Router } from 'express';
import { authentication } from '../../middlewares/authentication/index.js';
import { authorization } from '../../middlewares/authorization/index.js';
import { runsController } from '../../controllers/runs/index.js';
import { runsValidator } from '../../validators/runs/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();

const runsPath = '/projects/:projectId/scenes/:sceneId/runs';
const runPath = `${runsPath}/:runId`;

router.get(runsPath,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId'),
    authorization.requireProjectRole("VIEWER"),
    runsController.getAll);

router.post(runsPath,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId'),
    authorization.requireProjectRole("EDITOR"),
    runsValidator.create,
    runsController.create);

router.get(runPath,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("VIEWER"),
    runsController.getById);

router.post(`${runPath}/chunks`,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("EDITOR"),
    runsValidator.chunk,
    runsController.uploadChunk);

router.post(`${runPath}/finish`,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("EDITOR"),
    runsController.finish);

router.get(`${runPath}/checkpoint`,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("VIEWER"),
    runsValidator.tickQuery('atOrBefore'),
    runsController.getCheckpoint);

router.get(`${runPath}/commands`,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("VIEWER"),
    runsValidator.tickQuery('fromTick', 'toTick'),
    runsController.getCommands);

router.get(`${runPath}/metrics`,
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId', 'runId'),
    authorization.requireProjectRole("VIEWER"),
    runsValidator.tickQuery('fromTick', 'toTick', 'step'),
    runsController.getMetrics);

export default router;
