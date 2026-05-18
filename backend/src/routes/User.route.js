const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../middleware');

router.get(
    '/profile',
    authMiddleware,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: 'Protected profile accessed',
            user: req.user
        });

    }
);

module.exports = router;