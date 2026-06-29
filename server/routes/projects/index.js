import { Router } from 'express';
import { Authentication } from '../../middlewares/authentication/index.js';
import { Authorization } from '../../middlewares/authorization/index.js'
import { ProjectsController } from '../../controllers/projects/index.js';
import { ProjectsValidator } from '../../validators/projects/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();

router.get('/projects', 
    Authentication.authenticate, 
    ProjectsController.getAll);

router.get('/projects/:projectId', 
    Authentication.authenticate, 
    validateUuidParam('projectId'),
    Authorization.requireProjectRole('VIEWER'),
    ProjectsController.getById);

router.post('/projects', 
    Authentication.authenticate, 
    ProjectsValidator.create, 
    ProjectsController.create);

router.put('/projects/:projectId', 
    Authentication.authenticate, 
    validateUuidParam('projectId'), 
    Authorization.requireProjectRole('EDITOR'), 
    ProjectsValidator.update, 
    ProjectsController.update);
    
router.delete('/projects/:projectId', 
    Authentication.authenticate, 
    validateUuidParam('projectId'), 
    Authorization.requireProjectRole('OWNER'),
    ProjectsController.delete);

export default router;
