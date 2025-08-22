// CoreChat/backend/src/index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connect.js';
import conversationRoutes from './routes/conversation.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());    // For parsing application/json
app.use(cors());    // Enable CORS for all routes   

// Connect to MongoDB
connectDB(MONGODB_URI);

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('CoreChat Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
