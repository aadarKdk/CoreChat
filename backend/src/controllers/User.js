// CoreChat/backend/src/controllers/User.js

import User from "../models/User.js";

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error feteching users: ", error.message);
        res.status(500).json({ message: "Failed to fetch users. "});
    }
};

const registerNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error adding user: ", error.message);
        res.status(500).json({ message: "Failed to add user. "});
    }
};

export { getAllUsers, registerNewUser };