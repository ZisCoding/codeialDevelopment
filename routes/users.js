// doing the same thing we did in routes/index.js
const express = require('express');

const passport = require('passport');

const router = express.Router();

const userController = require('../contollers/users_controller');


router.get('/profile', 
passport.checkAuthentication , //using the fucntion we defined in passport config
userController.profile);

router.get('/timeline',userController.timeLine);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

// authenticatingg using passport if the authentication will be successfull it will call unserController.createSession otherwise redirect to sign-in 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);


module.exports = router;