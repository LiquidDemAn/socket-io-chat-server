import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const loadUser = async (req, res) => {
	try {
		const _id = req.params.id;

		const user = await UserModel.findById(_id);

		if (!user) {
			return res.status(404).json({
				msg: 'User not found',
				status: false,
			});
		}

		return res.json({
			user,
			status: true,
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const isUsernameUsed = await UserModel.findOne({ username });
		const isEmailUsed = await UserModel.findOne({ email });

		if (isUsernameUsed) {
			return res.status(409).json({
				msg: 'Username already used',
				status: false,
			});
		}

		if (isEmailUsed) {
			return res.status(409).json({
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

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await UserModel.findOne({ username });

		if (!user) {
			return res.status(400).json({
				msg: 'Incorrect username or password',
				status: false,
			});
		}

		const isValidPass = await bcrypt.compare(password, user.password);

		if (!isValidPass) {
			return res.status(404).json({
				msg: 'Incorrect username or password',
				status: false,
			});
		}

		res.json({ user, status: true });
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const setAvatar = async (req, res) => {
	try {
		const _id = req.params.id;
		const avatar = req.body.avatar;

		const user = await UserModel.findOneAndUpdate(
			{ _id },
			{
				avatar: avatar,
			},
			{ new: true }
		).exec();

		return res.json(user.avatar);
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const getContacts = async (req, res) => {
	const id = req.params.id;

	try {
		const users = await UserModel.find({ _id: { $ne: id } })
			.select({ _id: 1, email: 1, username: 1, avatar: 1 })
			.exec();

		return res.json({
			users,
			status: true,
		});
	} catch (err) {}
};
