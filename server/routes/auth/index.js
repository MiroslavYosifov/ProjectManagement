import { Router } from 'express';
import { Authentication } from '../../middlewares/authentication/index.js';
import { AuthValidator } from '../../validators/auth/index.js';
import { AuthController } from '../../controllers/auth/index.js';

const router = Router();

router.post('/auth/register', AuthValidator.register, AuthController.register);
router.post('/auth/login', AuthValidator.login, AuthController.login);
router.post('/auth/refresh', AuthController.refresh);
router.post('/auth/logout', Authentication.authenticate, AuthController.logout);

export default router;