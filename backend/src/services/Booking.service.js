const {
    bookingDAO,
    tutorDAO
} = require('../DAO');

const createBooking = async (
    studentId,
    bookingData
) => {

    bookingData.student = studentId;

    return await bookingDAO.createBooking(
        bookingData
    );
};

const getMyBookings = async (studentId) => {

    return await bookingDAO.getBookingsByStudent(
        studentId
    );
};

const getTutorBookings = async (userId) => {
    
    console.log("USER ID:", userId);
    const tutor = await tutorDAO.getTutorByUserId(
        userId
    );
    
    console.log("TUTOR:", tutor);
    if (!tutor) {
        throw new Error('Tutor profile not found');
    }

    return await bookingDAO.getBookingsByTutor(
        tutor._id
    );
};

const changeBookingStatus = async (
    bookingId,
    status
) => {

    return await bookingDAO.updateBookingStatus(
        bookingId,
        status
    );
};

module.exports = {
    createBooking,
    getMyBookings,
    getTutorBookings,
    changeBookingStatus
};