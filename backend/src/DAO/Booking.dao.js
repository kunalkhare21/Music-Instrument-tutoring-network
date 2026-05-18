const { Booking } = require('../models');

const createBooking = async (bookingData) => {

    return await Booking.create(
        bookingData
    );

};

const getBookingsByStudent = async (
    studentId
) => {

    return await Booking.find({
        student: studentId
    })

    .populate({
        path: 'tutor',
        populate: {
            path: 'user',
            select: 'fullName email'
        }
    });

};

const getBookingsByTutor = async (
    tutorId
) => {

    return await Booking.find({
        tutor: tutorId
    })

    .populate({
        path: 'student',
        select: 'fullName email'
    })

    .populate({
        path: 'tutor',
        populate: {
            path: 'user',
            select: 'fullName email'
        }
    });

};

const updateBookingStatus = async (
    bookingId,
    status
) => {

    return await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
    );

};

module.exports = {
    createBooking,
    getBookingsByStudent,
    getBookingsByTutor,
    updateBookingStatus
};