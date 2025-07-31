//CoreChat/backend/src/db/connect.js

import mongoose from "mongoose";

async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatdb'); 
        console.log("Connected to MongoDB.");
    } catch (err) {
        console.error('Failed to connect to MongodB');
        // process.exit(1);    // exit the app if DB fails.
    }
}

export default connect;