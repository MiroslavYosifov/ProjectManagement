import { Router } from 'express';
import { MembersController } from '../../controllers/members/index.js';
import { Authentication } from '../../middlewares/authentication/index.js';
import { MembersValidator } from '../../validators/members/index.js';
import { Authorization } from '../../middlewares/authorization/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();

// Any member can see who else is on the project; only the owner can change it.
router.get(
    '/projects/:projectId/members',
    Authentication.authenticate,
    validateUuidParam('projectId'),
    Authorization.requireProjectRole('VIEWER'),
    MembersController.list,
);

router.post(
    '/projects/:projectId/members',
    Authentication.authenticate,
    validateUuidParam('projectId'),
    Authorization.requireProjectRole('OWNER'),
    MembersValidator.add,
    MembersController.set,
);

router.delete(
    '/projects/:projectId/members/:userId',
    Authentication.authenticate,
    validateUuidParam('projectId', 'userId'),
    Authorization.requireProjectRole('OWNER'),
    MembersController.remove,
);

export default router;
