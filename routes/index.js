//now after server encounter the the routing middleware it  will come here

const  express = require('express');

//setting up the router to export
const router = express.Router();

// fetching the home controller for performing home related actions 
const homeController = require('../contollers/home_controller');

// routing to the home controller 
router.get('/',homeController.home);
router.get('/about',homeController.about);

// using the other routing files to route for different adresses 

// for all user related routing this middleware will be used
router.use('/users',require('./users'));

// for all posts related routing this middleware will be used
router.use('/posts',require('./posts'));

module.exports = router;