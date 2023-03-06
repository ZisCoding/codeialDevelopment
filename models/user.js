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
    }
},{
    timestamps: true // this track when user is created and updated
});

// telling mongoose that userSchema is a model
const User = mongoose.model('User',userSchema);

module.exports = User;