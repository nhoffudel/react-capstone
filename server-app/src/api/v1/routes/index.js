// npm imports
const express = require('express');

// Source code imports
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const entryRoutes = require('./entry.route');

/**
 * Here we combine all our different routes into one 
 * to make it easier to add them all to our express server
 */

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

/**
 * Add each new router that you create here
 */
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/entry', entryRoutes);

module.exports = router;