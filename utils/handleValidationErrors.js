import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(403).json(errors.array()[0]);
	}

	next();
};
