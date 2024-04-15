const express = require('express');
const router = express.Router();


router.use('/users', require('./userRoutes'));
router.use('/products', require('./authRoutes'));

module.exports = router;