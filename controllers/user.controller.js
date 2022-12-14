import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
	try {
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

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await UserModel.findOne({ username });

		if (!user) {
			return res.json({
				msg: 'Incorrect username or password',
				status: false,
			});
		}

		const isValidPass = await bcrypt.compare(password, user.password);

		if (!isValidPass) {
			return res.json({
				msg: 'Incorrect username or password',
				status: false,
			});
		}

		res.json({ user, status: true });
	} catch (err) {
		console.log(err);
	}
};

export const setAvatar = async (req, res) => {
	try {
		const _id = req.params.id;
		const avatar = req.body.avatar;

		const user = await UserModel.findOneAndUpdate(
			{ _id },
			{
				avatar,
			}
		);

		return res.json({
			avatar: user.avatar,
			status: true,
		});
	} catch (err) {
		console.log(err);
	}
};
