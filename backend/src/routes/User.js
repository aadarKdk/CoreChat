// CoreChat/backend/src/routes/User.js

import express from 'express';
import { getAllUsers, registerNewUser } from '../controllers/User.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', registerNewUser);

export default router;
