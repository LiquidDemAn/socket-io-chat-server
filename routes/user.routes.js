import { Router } from 'express';
import { UserContorller } from '../controllers/index.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';
import { registerValidation } from '../validations.js';

export const router = Router();

router.post(
	'/register',
	registerValidation,
	handleValidationErrors,
	UserContorller.register
);

router.post('/login', UserContorller.login);
router.post('/set-avatar/:id', UserContorller.setAvatar);
