const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const {
    authRoutes,
    userRoutes,
    tutorRoutes,
    bookingRoutes,
    paymentRoutes
} = require('./routes');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Music Instrument Tutoring Network Backend Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use(
    "/api/payments",
    paymentRoutes
)
module.exports = app;