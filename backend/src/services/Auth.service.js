const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { userDAO } = require('../DAO');

const registerUser = async (userData) => {

    const existingUser = await userDAO.findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    return await userDAO.createUser(userData);
};

const loginUser = async (email, password) => {

    const user = await userDAO.findUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return {
        user,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};