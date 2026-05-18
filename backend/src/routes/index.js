const authRoutes = require('./Auth.route');

const userRoutes = require('./User.route');

const tutorRoutes = require('./Tutor.route');

const bookingRoutes = require('./Booking.route');

const paymentRoutes = require('./payment.routes')

module.exports = {
    authRoutes,
    userRoutes,
    tutorRoutes,
    bookingRoutes,
    paymentRoutes
};