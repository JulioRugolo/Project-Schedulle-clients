const authService = require('../services/auth.services');

const signUp = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            error: 'Email or password is missing',
        });
    }
    try {
        const user = await authService.signUp({ email, password });
        user.password = undefined;
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            error: 'Email or password is missing',
        });
    }
    try {
        const { user, token } = await authService.signIn({ email, password });
        user.password = undefined;
        res.status(201).json({ user, token })
    } catch (error) {
        next(error)
    }
};

const me = async (req, res, next) => {
    try {
        const user = await authService.me(req.user.id);
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
    signIn,
    me,
}