const User = require("../models/User.model")
const {
    createTutorProfile,
    getAllTutors,
    getTutorById
} = require('../services/Tutor.service');

const createProfile = async (req, res) => {

    try {

        const tutor = await createTutorProfile(
            req.user.id,
            req.body
        );
        await User.findByIdAndUpdate(
            req.user.id,
            {
                role: "tutor"
            }
        )

        res.status(201).json({
            success: true,
            message: 'Tutor profile created successfully',
            data: tutor
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const getTutors = async (req, res) => {

    try {

        const tutors = await getAllTutors();

        res.status(200).json({
            success: true,
            count: tutors.length,
            data: tutors
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getTutor = async (req, res) => {

    try {

        const tutor = await getTutorById(req.params.id);

        res.status(200).json({
            success: true,
            data: tutor
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createProfile,
    getTutors,
    getTutor
};