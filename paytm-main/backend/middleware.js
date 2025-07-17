const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');
const { User } = require("./db");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            // Fetch user from database and set req.user
            const user = await User.findById(decoded.userId);
            req.userId = decoded.userId;

            if (user) {
                req.user = user; // Set user details in request
                next();
            } else {
                return res.status(403).json({ message: 'User not found' });
            }
        } else {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
