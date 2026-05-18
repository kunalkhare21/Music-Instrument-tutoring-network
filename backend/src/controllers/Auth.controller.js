const {
    registerUser,
    loginUser
} = require('../services/Auth.service');

const { userResponseDTO } = require('../DTO');

const signup = async (req, res) => {

    try {

        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponseDTO(user)
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: result.token,
            data: userResponseDTO(result.user)
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    signup,
    login
};