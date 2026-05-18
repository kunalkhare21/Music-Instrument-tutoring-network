const { Tutor } = require('../models');

const createTutorProfile = async (tutorData) => {

    return await Tutor.create(tutorData);

};

const getTutorByUserId = async (userId) => {

    return await Tutor.findOne({ user: userId });

};

const getAllTutors = async () => {

    return await Tutor.find()
        .populate(
            'user',
            'fullName email role'
        );

};

const getTutorById = async (id) => {

    return await Tutor.findById(id)
        .populate(
            'user',
            'fullName email role'
        );

};

module.exports = {
    createTutorProfile,
    getTutorByUserId,
    getAllTutors,
    getTutorById
};