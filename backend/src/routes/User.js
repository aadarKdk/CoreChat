// CoreChat/backend/src/routes/User.js

import express from 'express';
import { getAllUsers, registerNewUser, loginUser } from '../controllers/User.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', registerNewUser);
router.post('/login', loginUser);

export default router;
