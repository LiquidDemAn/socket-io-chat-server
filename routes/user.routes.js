import { Router } from 'express';
import { UserContorller } from '../controllers/index.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';
import { registerValidation } from '../validations.js';

export const router = Router();

router.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserContorller.register
);

router.post('/auth/login', UserContorller.login);
router.post('/auth/set-avatar/:id', UserContorller.setAvatar);
router.get('/auth/load-user/:id', UserContorller.loadUser);
router.get('/contacts/:id', UserContorller.getContacts);
