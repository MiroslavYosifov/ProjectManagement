import { Router } from 'express';
import { authentication } from '../../middlewares/authentication/index.js';
import { authorization } from '../../middlewares/authorization/index.js'
import { projectsController } from '../../controllers/projects/index.js';
import { projectsValidator } from '../../validators/projects/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();

router.get('/projects',
    authentication.authenticate,
    projectsController.getAll);

router.get('/projects/:projectId',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole('VIEWER'),
    projectsController.getById);

router.post('/projects',
    authentication.authenticate,
    projectsValidator.create,
    projectsController.create);

router.put('/projects/:projectId',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole('EDITOR'),
    projectsValidator.update,
    projectsController.update);

router.delete('/projects/:projectId',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole('OWNER'),
    projectsController.delete);

export default router;
