// CoreChat/backend/src/models/message.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text',
    },
    // For images/files, store URL/path
    fileUrl: {
        type: String,
        required: function() { return this.messageType !== 'text'; } // Required if not text
    },
    // for read receipts, tracking who has read the message
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
},
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
