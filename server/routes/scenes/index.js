import { Router } from 'express';
import { Authentication } from '../../middlewares/authentication/index.js';
import { Authorization } from '../../middlewares/authorization/index.js';
import { ScenesController } from '../../controllers/scenes/index.js';
import { ScenesValidator } from '../../validators/scenes/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();


router.get('/projects/:projectId/scenes',
    Authentication.authenticate,
    validateUuidParam('projectId'),
    Authorization.requireProjectRole("VIEWER"),
    ScenesController.getAll);

router.get('/projects/:projectId/scenes/:sceneId',
    Authentication.authenticate, validateUuidParam('projectId', 'sceneId'),
    Authorization.requireProjectRole("VIEWER"),
    ScenesController.getById);

router.post('/projects/:projectId/scenes',
    Authentication.authenticate,
    validateUuidParam('projectId'),
    Authorization.requireProjectRole("EDITOR"),
    ScenesValidator.create,
    ScenesController.create);

router.put('/projects/:projectId/scenes/:sceneId', 
    Authentication.authenticate, 
    validateUuidParam('projectId', 'sceneId'),
    Authorization.requireProjectRole("EDITOR"), 
    ScenesValidator.update, 
    ScenesController.update);

router.delete('/projects/:projectId/scenes/:sceneId',
    Authentication.authenticate,
    validateUuidParam('projectId', 'sceneId'),
    Authorization.requireProjectRole("EDITOR"),
    ScenesController.delete);

export default router;
