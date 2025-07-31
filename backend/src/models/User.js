// CoreChat/backend/src/models/User.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false, // offline/online
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,  // account enabled/disabled
    },
},
    {
        timestamps: true, // createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

export default User;