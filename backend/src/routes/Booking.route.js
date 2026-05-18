const express = require('express');

const router = express.Router();

const {
    bookingController
} = require('../controllers');

const {
    authMiddleware
} = require('../middleware');

router.post(
    '/',
    authMiddleware,
    bookingController.create
);

router.get(
    '/my-bookings',
    authMiddleware,
    bookingController.myBookings
);

router.get(
    '/tutor-bookings',
    authMiddleware,
    bookingController.tutorBookings
);

router.patch(
    '/:id/status',
    authMiddleware,
    bookingController.updateStatus
);

module.exports = router;