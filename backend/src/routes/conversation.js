// CoreChat/backend/src/routes/conversation.js

import express from 'express';
import {
    createConversation,
    getUserConversations,
    getConversationById,
    addParticipantsToGroup,
    removeParticipantsFromGroup,
    updateGroupConversation
} from '../controllers/conversation.js';
import { verifyToken } from '../middleware/auth.js';

const conversationRoutes = express.Router();

// Route to create a new conversation (DM or Group)
// POST /api/conversations
conversationRoutes.post('/', verifyToken, createConversation);

// Route to get all conversations for the authenticated user
// GET /api/conversations/me
conversationRoutes.get('/me', verifyToken, getUserConversations);

// Route to get a single conversation by ID
// GET /api/conversations/:conversationId
conversationRoutes.get('/:conversationId', verifyToken, getConversationById);

// Route to add participants to a group conversation
// PUT /api/conversations/:conversationId/add-participants
conversationRoutes.put('/:conversationId/add-participants', verifyToken, addParticipantsToGroup);

// Route to remove participants from a group conversation
// PUT /api/conversations/:conversationId/remove-participants
conversationRoutes.put('/:conversationId/remove-participants', verifyToken, removeParticipantsFromGroup);

// Route to update group conversation details (e.g., name, avatar)
// PUT /api/conversations/:conversationId/update-group
conversationRoutes.put('/:conversationId/update-group', verifyToken, updateGroupConversation);

export default conversationRoutes;
