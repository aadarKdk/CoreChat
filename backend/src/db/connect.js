// CoreChat/backend/src/db/connect.js

import mongoose from "mongoose";

async function connectDB(uri){
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}
export default connectDB;