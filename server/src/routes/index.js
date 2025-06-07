const express = require('express');
const noteRoutes = require('./noteRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

module.exports = router;