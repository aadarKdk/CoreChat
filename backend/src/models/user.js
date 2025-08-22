// CoreChat/backend/src/models/user.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

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
        type: String, 
        enum: ['online', 'offline', 'away', 'do_not_disturb'],
        default: 'offline',
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
    profilePicture: { 
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', // Default profile picture URL
    },
    bio: { 
        type: String,
        maxlength: 200,
        trim: true
    }
},
    {
        timestamps: true, 
    }
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
