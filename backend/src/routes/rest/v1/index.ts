import { Router } from 'express';
import profiles from './profiles';
import plans from './plans';
import aiCommands from './ai_commands';
import aiHistory from './ai_history';
import integrations from './integrations';

const router = Router();

router.use('/profiles', profiles);
router.use('/plans', plans);
router.use('/ai_commands', aiCommands);
router.use('/ai_history', aiHistory);
router.use('/integrations', integrations);

export default router;
