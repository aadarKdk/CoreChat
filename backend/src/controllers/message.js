// CoreChat/backend/src/controllers/message.js

import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import User from "../models/user.js"; 

const sendMessage = async (req, res) => {
    try {
        const { conversationId, content, messageType = 'text', fileUrl } = req.body;
        const senderId = req.user._id; // user ID from authentication

        if (!conversationId || !content) {
            return res.status(400).json({ message: "Conversation ID and content are required." });
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }
        if (!conversation.participants.includes(senderId)) {
            return res.status(403).json({ message: "You are not a participant in this conversation." });
        }

        const newMessage = await Message.create({
            sender: senderId,
            conversation: conversationId,
            content,
            messageType,
            fileUrl: messageType !== 'text' ? fileUrl : undefined, // Only store fileUrl if not text
        });

        // Update the last message in the conversation
        conversation.lastMessage = newMessage._id;
        conversation.unreadCounts = conversation.unreadCounts.map(uc => {
            if (uc.user.toString() !== senderId.toString()) {
                uc.count += 1; 
            }
            return uc;
        });
        await conversation.save();

        // Populate sender details for the response
        const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'name username profilePicture');

        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Failed to send message." });
    }
};



const getMessagesByConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id; 

        const conversation = await Conversation.findById(conversationId);
        if (!conversation || !conversation.participants.includes(userId)) {
            return res.status(403).json({ message: "Unauthorized access to conversation messages." });
        }

        const messages = await Message.find({ conversation: conversationId })
            .populate('sender', 'name username profilePicture') 
            .sort({ createdAt: 1 }); 

        await Conversation.updateOne(
            { _id: conversationId, 'unreadCounts.user': userId },
            { $set: { 'unreadCounts.$.count': 0 } }
        );

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Failed to fetch messages." });
    }
};


const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id; // user ID from authentication
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this message." });
        }

        await message.deleteOne(); 
       // Optionally update the last message in the conversation if the deleted message was the last one
        const conversation = await Conversation.findById(message.conversation);
        if (conversation && conversation.lastMessage && conversation.lastMessage.toString() === messageId.toString()) {
            const lastExistingMessage = await Message.findOne({ conversation: message.conversation }).sort({ createdAt: -1 });
            conversation.lastMessage = lastExistingMessage ? lastExistingMessage._id : null;
            await conversation.save();
        }
        res.status(200).json({ message: "Message deleted successfully." });
    } catch (error) {
        console.error("Error deleting message:", error.message);
        res.status(500).json({ message: "Failed to delete message." });
    }
};



export { sendMessage, getMessagesByConversation, deleteMessage };
