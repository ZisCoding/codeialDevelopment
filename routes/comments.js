const express = require('express');

const passport = require('passport');

const router = express.Router();

const commentController = require('../contollers/comment_controller');

router.use('/create',commentController.create);

module.exports = router;
