// CoreChat/backend/src/models/conversation.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }],
    type: { 
        type: String,
        enum: ['dm', 'group'],
        required: true,
    },
    name: { 
        type: String,
        required: function() { return this.type === 'group'; }, // Name is required only for group chats
        trim: true,
    },
    groupAdmin: { // For group chats, admin creates/manages it
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.type === 'group'; },
    },
    avatar: { // avatar for group chats
        type: String,
        default: 'https://placehold.co/150x150/abcabc/ffffff?text=Group'
    },
    lastMessage: { // Reference to the last message for quick display in chat list
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
    unreadCounts: [{ // To track unread messages per participant
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        count: {
            type: Number,
            default: 0,
        },
    }],
},
    {
        timestamps: true, 
    }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
