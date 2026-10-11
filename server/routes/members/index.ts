import { Router } from 'express';
import { membersController } from '../../controllers/members/index.js';
import { authentication } from '../../middlewares/authentication/index.js';
import { membersValidator } from '../../validators/members/index.js';
import { authorization } from '../../middlewares/authorization/index.js';
import { validateUuidParam } from '../../validators/common/index.js';

const router = Router();

router.get(
    '/projects/:projectId/members',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole('VIEWER'),
    membersController.list,
);

router.post(
    '/projects/:projectId/members',
    authentication.authenticate,
    validateUuidParam('projectId'),
    authorization.requireProjectRole('OWNER'),
    membersValidator.add,
    membersController.set,
);

router.delete(
    '/projects/:projectId/members/:userId',
    authentication.authenticate,
    validateUuidParam('projectId', 'userId'),
    authorization.requireProjectRole('OWNER'),
    membersController.remove,
);

export default router;
