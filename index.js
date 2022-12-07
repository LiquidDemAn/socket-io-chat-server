import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/index.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/auth', userRouter);

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

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`);
});
