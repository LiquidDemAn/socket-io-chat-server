import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { messagesRouter, userRouter } from './routes/index.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes

app.use('/api', userRouter);
app.use('/api/messages', messagesRouter);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connection successfull');
	})
	.catch((err) => {
		console.log(err.message);
	});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`);
});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;

	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-message', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);

		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('message-receive', {
				_id: data._id,
				message: data.text,
				from: data.from,
				to: data.to,
				fromSelf: false,
			});
		}
	});
});
