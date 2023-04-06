const mongoose = require('mongoose');

// creating a schema for storing user information
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // this field is must be filled
        unique: true // it should be unique
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
},{
    timestamps: true // this track when user is created and updated
});

// importing multer for saving files in this case avatar
const multer = require('multer');
// importing path module to work with paths
const path = require('path');
// defining the path where the avatar will be saves
const AVATAR_PATH = path.join('/uploads/users/avatar');

// defining the storage where to save files in multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH)); // null shows that there is no error and second field is where to save file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix) // defining a unique file name so that while dont get overrided 
    }
});

// defining static method and variable so that we can access them wherever the user model is available
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar'); // here singles means we will be getting a single file 
userSchema.statics.avatarPath = AVATAR_PATH;

// telling mongoose that userSchema is a model
const User = mongoose.model('User',userSchema);

module.exports = User;