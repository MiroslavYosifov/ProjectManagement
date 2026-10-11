import { Router } from 'express';
import { authentication } from '../../middlewares/authentication/index.js';
import { authorization } from '../../middlewares/authorization/index.js';
import { scenesController } from '../../controllers/scenes/index.js';
import { scenesValidator } from '../../validators/scenes/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();


router.get('/projects/:projectId/scenes',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole("VIEWER"),
    scenesController.getAll);

router.get('/projects/:projectId/scenes/:sceneId',
    authentication.authenticate, validateUuidParam('projectId', 'sceneId'),
    authorization.requireProjectRole("VIEWER"),
    scenesController.getById);

router.post('/projects/:projectId/scenes',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole("EDITOR"),
    scenesValidator.create,
    scenesController.create);

router.put('/projects/:projectId/scenes/:sceneId',
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId'),
    authorization.requireProjectRole("EDITOR"),
    scenesValidator.update,
    scenesController.update);

router.delete('/projects/:projectId/scenes/:sceneId',
    authentication.authenticate,
    validateUuidParam('projectId', 'sceneId'),
    authorization.requireProjectRole("EDITOR"),
    scenesController.delete);

export default router;
