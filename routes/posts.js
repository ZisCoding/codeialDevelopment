// doing the same thing we did in routes/index.js
const express = require('express');

const passport = require('../config/passport-local-strategy');

const router = express.Router();

const postController= require('../contollers/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create);


module.exports = router;