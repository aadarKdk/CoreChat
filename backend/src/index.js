// CoreChat/backend/src/index.js

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/User.js';
import connect from './db/connect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

await connect(); // Ensure DB connection before starting (if your environment supports top-level await)

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
