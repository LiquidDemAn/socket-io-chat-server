import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
	try {
		console.log(req.body);

		const { username, email, password } = req.body;

		const isUsernameUsed = await UserModel.findOne({ username });
		const isEmailUsed = await UserModel.findOne({ email });

		if (isUsernameUsed) {
			return res.json({
				msg: 'Username already used',
				status: false,
			});
		}

		if (isEmailUsed) {
			return res.json({
				msg: 'Email already used',
				status: false,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const doc = new UserModel({
			username,
			email,
			password: hashedPassword,
		});

		const user = await doc.save();

		res.json({ user, status: true });
	} catch (err) {
		console.log(err);
	}
};
