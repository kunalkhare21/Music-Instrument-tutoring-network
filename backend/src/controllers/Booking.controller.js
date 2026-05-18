const {
    createBooking,
    getMyBookings,
    getTutorBookings,
    changeBookingStatus
} = require('../services/Booking.service');

const create = async (req, res) => {

    try {

        const booking = await createBooking(
            req.user.id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const myBookings = async (req, res) => {

    try {

        const bookings = await getMyBookings(
            req.user.id
        );

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const tutorBookings = async (req, res) => {

    try {

        const bookings = await getTutorBookings(
            req.user.id
        );

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const updateStatus = async (req, res) => {

    try {

        const booking = await changeBookingStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: 'Booking status updated',
            data: booking
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    create,
    myBookings,
    tutorBookings,
    updateStatus
};