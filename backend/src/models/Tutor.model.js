const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        instrument: {
            type: String,
            required: true
        },

        bio: {
            type: String,
            required: true
        },

        experience: {
            type: Number,
            required: true
        },

        hourlyRate: {
            type: Number,
            required: true
        },

        availability: {
            type: String,
            default: 'Available'
        },

        profileImage: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tutor', tutorSchema);