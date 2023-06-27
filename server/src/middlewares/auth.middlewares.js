const jwt = require('jsonwebtoken');
const User = require('../models/auth.models');
const dotenv = require('dotenv');

const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user) throw new Error('User not found');

        req.user = user
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Unauthorized',
        });
    }
};

module.exports = { verifyToken };