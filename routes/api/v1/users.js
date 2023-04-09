const express = require('express');
const router = express.Router();
const passport = require('passport');
const userApi = require('../../../contollers/api/v1/users_api');

router.post('/create-session',userApi.createSession);

module.exports = router;