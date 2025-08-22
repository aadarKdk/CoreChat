// CoreChat/backend/src/routes/message.js

import express from 'express';
import { sendMessage, getMessagesByConversation, deleteMessage } from '../controllers/message.js';
import { verifyToken } from '../middleware/auth.js'; 

const messageRoutes = express.Router();

messageRoutes.post('/', verifyToken, sendMessage);
messageRoutes.get('/:conversationId', verifyToken, getMessagesByConversation);
messageRoutes.delete('/:messageId', verifyToken, deleteMessage);

export default messageRoutes;
