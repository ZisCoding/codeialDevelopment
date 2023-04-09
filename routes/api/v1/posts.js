const express = require('express');
const router = express.Router();
const passport = require('passport');

const postApi = require("../../../contollers/api/v1/posts_api")

router.get('/',postApi.index);

// before deleting authenticating the user using passport's jwt strategy
router.delete('/:id', passport.authenticate('jwt',{session:false}), postApi.delete);

module.exports = router;