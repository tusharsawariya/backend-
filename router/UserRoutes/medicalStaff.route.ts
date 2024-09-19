import { Router } from 'express';
import { register} from '../../controller/medicalStaff.controller';
import { signIn } from '../../controller/auth.controller';
const router = Router();

router.post('/register', register);
router.post('/login',signIn);

export default router;
