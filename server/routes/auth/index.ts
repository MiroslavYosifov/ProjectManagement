import { Router } from 'express';
import { authentication } from '../../middlewares/authentication/index.js';
import { authValidator } from '../../validators/auth/index.js';
import { authController } from '../../controllers/auth/index.js';

const router = Router();

router.post('/auth/register', 
    authValidator.register, 
    authController.register
);

router.post('/auth/login', 
    authValidator.login, 
    authController.login
);

router.post('/auth/refresh', 
    authController.refresh
);

router.post('/auth/logout', 
    authentication.authenticate, 
    authController.logout
);

export default router;