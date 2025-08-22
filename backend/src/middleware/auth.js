// CoreChat/backend/src/middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyToken = async (req, res, next) => {
    let token;

    // Check for token in headers (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to the request object (without password)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    } else if (req.cookies && req.cookies.token) { // Check for token in HttpOnly cookie
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Cookie token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, cookie token failed.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

export { verifyToken };
