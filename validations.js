import { body } from 'express-validator';

export const registerValidation = [
	body('username', 'Username is invalid')
		.isString()
		.isLength({ min: 3 })
		.not()
		.custom((value) => {
			const hasSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			const hasNumber = /\d/;

			return hasSpecialChars.test(value) || hasNumber.test(value);
		}),
	body('email', 'Incorrect email format').isEmail(),
	body('password', 'Password must be greater than 8 characters')
		.isString()
		.isLength({
			min: 8,
		}),
];
