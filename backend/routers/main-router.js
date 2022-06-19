const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {router: jobRouter} = require('./job-router');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

router.use(limiter);
router.use('/jobs', jobRouter);

module.exports = {router};
