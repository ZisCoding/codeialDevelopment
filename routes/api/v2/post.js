const express = require('express');
const router = express.Router();

const postApi = require('../../../contollers/api/v2/posts_api');

router.get('/' , postApi.index);

module.exports = router;