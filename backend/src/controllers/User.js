// CoreChat/backend/src/controllers/User.js

import User from "../models/User.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        console.log.error("Error feteching users: ", error.message);
        res.status(500).json({ message: " Failed to fetch users. " });
        
    }
};

const registerNewUser = async (req, res) => {
    try {
        const existingUser = await User.exists({ email: req.body.email });
        if(existingUser){
            return res.status(400).json({ message: "E-mail already exists. Use another email to register. "});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });
        res.status(201).json(newUser);


    } catch (error) {
        console.error("Error adding user: ", error.message );
        res.status(500).json({ message: "Failed to add user." });
    }
};

export { getAllUsers, registerNewUser };