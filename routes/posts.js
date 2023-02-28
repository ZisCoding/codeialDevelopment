// doing the same thing we did in routes/index.js
const express = require('express');

const router = express.Router();

const postController= require('../contollers/posts_controller');

router.get('/caption',postController.caption);


module.exports = router;