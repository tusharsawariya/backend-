import { Router } from 'express';
import { registerDoctor } from '../../controller/doctor.controller';
import { signIn } from '../../controller/auth.controller';
const router = Router();

// Register Doctor
router.post('/register', registerDoctor);

// Sign In Doctor
router.post('/signin',signIn);

export default router;
