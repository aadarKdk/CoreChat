// CoreChat/backend/src/controllers/user.js

import User from "../models/user.js";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users: ", error.message);
        res.status(500).json({ message: "Failed to fetch users." });
    }
};

const registerNewUser = async (req, res) => {
    try {
        const { name, email, username, password, gender } = req.body;

        if (!name || !email || !username || !password) {
            return res.status(400).json({ message: "All required fields (name, email, username, password) are needed." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "E-mail already exists. Please use another email to register." });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already taken. Please choose another username." });
        }

        const newUser = await User.create({
            name,
            email,
            username,
            password,
            gender,
        });

        const { password: userPassword, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({
            message: "Registration successful!",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Error during user registration: ", error.message);
        res.status(500).json({ message: "Failed to register user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatched = await user.matchPassword(password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "100d",
        });

      
        const { password: userPassword, ...userWithoutPassword } = user.toObject();

        return res.status(200).json({
            message: "Login successful!",
            token,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully!' });
};


export { registerNewUser, loginUser, getAllUsers, logoutUser };
