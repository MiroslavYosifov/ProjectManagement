import { Router } from 'express';
import authRouter from './auth/index.js';
import projectsRouter from './projects/index.js';
import scenesRouter from './scenes/index.js';
import membersRouter from './members/index.js';
import runsRouter from './runs/index.js';

const router = Router();

router.use(authRouter);
router.use(projectsRouter);
router.use(scenesRouter);
router.use(membersRouter);
router.use(runsRouter);

export default router;