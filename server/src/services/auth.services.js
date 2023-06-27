const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/auth.models');

dotenv.config();

const signUp = async (userData) => {
    const senhaCriptografada = await bcrypt.hash(userData.password, 10);
    const user = new User({
        email: userData.email,
        password: senhaCriptografada,
    })
    return user.save();
};

const signIn = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if(!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(userData.password, user.password);
    if(!isValidPassword) throw new Error('Invalid password');

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return { user, token };
}

const me = (userId) => User.findById(userId);

module.exports = {
    signUp,
    signIn,
    me,
}