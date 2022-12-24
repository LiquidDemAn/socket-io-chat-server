import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		users: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User',
				},
			],
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
