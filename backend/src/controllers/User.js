// CoreChat/backend/src/controllers/User.js

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
        if (existingUser) {
            return res.status(400).json({ message: "E-mail already exists. Use another email to register. " });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user: ", error.message);
        res.status(500).json({ message: "Failed to add user." });
    }
};


const loginUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({ message: "E-mail not registered!" });
    }

    const isMatched = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Optional: set token expiry
    });

    // Remove password before sending user
    const { password, ...userWithoutPassword } = existingUser.toObject();

    return res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
      isLoggedIn: true,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerNewUser, loginUser, getAllUsers };