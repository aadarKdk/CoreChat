// CoreChat/backend/src/controllers/conversation.js

import Conversation from "../models/conversation.js";
import User from "../models/user.js"; 


const createConversation = async (req, res) => {
    try {
        const { participants, type, name } = req.body;
        const currentUserId = req.user._id; // user ID from authentication

        if (!participants || !Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({ message: "Participants array is required." });
        }

        if (!participants.includes(currentUserId.toString())) {
            participants.push(currentUserId.toString());
        }

        const existingUsers = await User.find({ _id: { $in: participants } });
        if (existingUsers.length !== participants.length) {
            return res.status(400).json({ message: "One or more participants are invalid." });
        }

        if (type === 'dm') {
            if (participants.length !== 2) {
                return res.status(400).json({ message: "DM must have exactly two participants." });
            }
            const existingDm = await Conversation.findOne({
                type: 'dm',
                participants: { $all: participants },
            });

            if (existingDm) {
                return res.status(200).json({ message: "DM already exists.", conversation: existingDm });
            }
        } else if (type === 'group') {
            if (!name) {
                return res.status(400).json({ message: "Group name is required for group chats." });
            }
            if (participants.length < 2) { 
                return res.status(400).json({ message: "Group chat must have at least two participants." });
            }
        } else {
            return res.status(400).json({ message: "Invalid conversation type. Must be 'dm' or 'group'." });
        }

        const unreadCounts = participants.map(pId => ({ user: pId, count: 0 }));

        const newConversation = await Conversation.create({
            participants,
            type,
            name: type === 'group' ? name : undefined, 
            groupAdmin: type === 'group' ? currentUserId : undefined, 
            unreadCounts,
        });

        const populatedConversation = await Conversation.findById(newConversation._id)
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .populate('groupAdmin', 'name username profilePicture');

        res.status(201).json(populatedConversation);
    } catch (error) {
        console.error("Error creating conversation:", error.message);
        res.status(500).json({ message: "Failed to create conversation." });
    }
};



const getUserConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        const conversationsWithUnread = conversations.map(conv => {
            const unreadEntry = conv.unreadCounts.find(uc => uc.user.toString() === userId.toString());
            return {
                ...conv.toObject(),
                unreadCount: unreadEntry ? unreadEntry.count : 0,
            };
        });

        res.status(200).json(conversationsWithUnread);
    } catch (error) {
        console.error("Error fetching user conversations:", error.message);
        res.status(500).json({ message: "Failed to fetch conversations." });
    }
};



const getConversationById = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findById(conversationId)
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .populate('groupAdmin', 'name username profilePicture');

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        if (!conversation.participants.some(p => p._id.toString() === userId.toString())) {
            return res.status(403).json({ message: "You are not a participant in this conversation." });
        }

        const unreadEntry = conversation.unreadCounts.find(uc => uc.user.toString() === userId.toString());
        const conversationWithUnread = {
            ...conversation.toObject(),
            unreadCount: unreadEntry ? unreadEntry.count : 0,
        };

        res.status(200).json(conversationWithUnread);
    } catch (error) {
        console.error("Error fetching conversation by ID:", error.message);
        res.status(500).json({ message: "Failed to fetch conversation." });
    }
};



const addParticipantsToGroup = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { newParticipantIds } = req.body;
        const currentUserId = req.user._id;

        if (!newParticipantIds || !Array.isArray(newParticipantIds) || newParticipantIds.length === 0) {
            return res.status(400).json({ message: "New participant IDs are required." });
        }

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        if (conversation.type !== 'group') {
            return res.status(400).json({ message: "Cannot add participants to a direct message." });
        }

        if (conversation.groupAdmin.toString() !== currentUserId.toString()) {
            return res.status(403).json({ message: "Only the group admin can add participants." });
        }

        const validNewParticipants = await User.find({ _id: { $in: newParticipantIds } });
        const existingParticipantIds = conversation.participants.map(p => p.toString());

        const participantsToAdd = validNewParticipants.filter(
            user => !existingParticipantIds.includes(user._id.toString())
        );

        if (participantsToAdd.length === 0) {
            return res.status(400).json({ message: "No new valid participants to add or already in group." });
        }

        const newParticipantObjects = participantsToAdd.map(p => p._id);
        conversation.participants.push(...newParticipantObjects);

        participantsToAdd.forEach(p => {
            conversation.unreadCounts.push({ user: p._id, count: 0 });
        });

        await conversation.save();

        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .populate('groupAdmin', 'name username profilePicture');

        res.status(200).json({ message: "Participants added successfully.", conversation: populatedConversation });
    } catch (error) {
        console.error("Error adding participants:", error.message);
        res.status(500).json({ message: "Failed to add participants." });
    }
};



const removeParticipantsFromGroup = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { participantIdsToRemove } = req.body;
        const currentUserId = req.user._id;

        if (!participantIdsToRemove || !Array.isArray(participantIdsToRemove) || participantIdsToRemove.length === 0) {
            return res.status(400).json({ message: "Participant IDs to remove are required." });
        }

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        if (conversation.type !== 'group') {
            return res.status(400).json({ message: "Cannot remove participants from a direct message." });
        }

        if (conversation.groupAdmin.toString() !== currentUserId.toString()) {
            return res.status(403).json({ message: "Only the group admin can remove participants." });
        }

        const initialParticipantCount = conversation.participants.length;
        conversation.participants = conversation.participants.filter(
            pId => !participantIdsToRemove.includes(pId.toString())
        );

        if (conversation.participants.length === initialParticipantCount) {
            return res.status(400).json({ message: "No specified participants found in the group or unable to remove." });
        }

        conversation.unreadCounts = conversation.unreadCounts.filter(
            uc => !participantIdsToRemove.includes(uc.user.toString())
        );

        await conversation.save();

        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .populate('groupAdmin', 'name username profilePicture');

        res.status(200).json({ message: "Participants removed successfully.", conversation: populatedConversation });
    } catch (error) {
        console.error("Error removing participants:", error.message);
        res.status(500).json({ message: "Failed to remove participants." });
    }
};



const updateGroupConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { name, avatar } = req.body;
        const currentUserId = req.user._id;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        if (conversation.type !== 'group') {
            return res.status(400).json({ message: "Can only update details for group chats." });
        }

        // Only group admin can update details
        if (conversation.groupAdmin.toString() !== currentUserId.toString()) {
            return res.status(403).json({ message: "Only the group admin can update group details." });
        }

        if (name) conversation.name = name;
        if (avatar) conversation.avatar = avatar;

        await conversation.save();

        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name username profilePicture status')
            .populate('lastMessage')
            .populate('groupAdmin', 'name username profilePicture');

        res.status(200).json({ message: "Group details updated successfully.", conversation: populatedConversation });
    } catch (error) {
        console.error("Error updating group conversation:", error.message);
        res.status(500).json({ message: "Failed to update group conversation." });
    }
};

export {
    createConversation,
    getUserConversations,
    getConversationById,
    addParticipantsToGroup,
    removeParticipantsFromGroup,
    updateGroupConversation
};
