// doing the same thing we did in routes/index.js
const express = require('express');

const router = express.Router();

const userController = require('../contollers/users_controller');

router.get('/profile',userController.profile);

router.get('/timeline',userController.timeLine);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

router.post('/create-session',userController.createSession);

router.post('/sign-out',userController.endSession);

module.exports = router;