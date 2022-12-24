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

		res.json({
			_id: data._id,
			fromSelf: true,
			message: text,
			from,
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};

export const getAllMessages = async (req, res) => {
	try {
		const { from, to } = req.params;
		const messages = await MessageModel.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });

		const projectMessages = messages.map((message) => {
			return {
				_id: message._id,
				fromSelf: message.sender.toString() === from,
				message: message.text,
				from,
			};
		});

		res.json(projectMessages);
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: 'Something went wrong...',
		});
	}
};
