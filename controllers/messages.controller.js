import MessageModel from '../models/message.model.js';

export const createMessage = async (req, res) => {
	try {
		const { from, to, text } = req.body;

		const data = await MessageModel.create({
			text,
			users: [from, to],
			sender: from,
		});

		if (!data) {
			res.status(500).json({
				message: 'Failed to create message',
			});
		}

		res.json(data);
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const getAllMessages = async (req, res) => {};
