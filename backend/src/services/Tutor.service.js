const { tutorDAO } = require('../DAO');

const createTutorProfile = async (userId, tutorData) => {

    const existingTutor = await tutorDAO.getTutorByUserId(userId);

    if (existingTutor) {
        throw new Error('Tutor profile already exists');
    }

    tutorData.user = userId;

    return await tutorDAO.createTutorProfile(tutorData);
};

const getAllTutors = async () => {

    return await tutorDAO.getAllTutors();

};

const getTutorById = async (id) => {

    const tutor = await tutorDAO.getTutorById(id);

    if (!tutor) {
        throw new Error('Tutor not found');
    }

    return tutor;
};

module.exports = {
    createTutorProfile,
    getAllTutors,
    getTutorById
};