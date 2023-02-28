// doing the same thing we did in routes/index.js
const express = require('express');

const router = express.Router();

const userController = require('../contollers/users_controller');

router.get('/profile',userController.profile);

router.get('/timeline',userController.timeLine);

module.exports = router;