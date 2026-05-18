const express = require('express');

const router = express.Router();

const { tutorController } = require('../controllers');

const { authMiddleware } = require('../middleware');

router.post(
    '/create-profile',
    authMiddleware,
    tutorController.createProfile
);

router.get(
    '/',
    tutorController.getTutors
);

router.get(
    '/:id',
    tutorController.getTutor
);

module.exports = router;