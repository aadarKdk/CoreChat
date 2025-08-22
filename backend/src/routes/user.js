// CoreChat/backend/src/routes/user.js

import express from 'express';
import { registerNewUser, loginUser, getAllUsers } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerNewUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/', verifyToken, getAllUsers);

export default userRoutes;