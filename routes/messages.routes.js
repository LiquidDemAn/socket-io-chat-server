import { Router } from 'express';
import { MessagesController } from '../controllers/index.js';

export const router = Router();

router.post('/create-message', MessagesController.createMessage);
router.get('/get-messages', MessagesController.getAllMessages);
