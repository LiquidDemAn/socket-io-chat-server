import { Router } from 'express';
import { register } from '../controllers/user.controller.js';

export const router = Router();

router.post('/register', register);
