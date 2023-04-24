const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // academicinfo:
    // {
    //     year: String,
    //     branch: String,
    //     sec: String,
    // },
    // postlist: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //     }
    // ],
    // likedPost: [
    //     { postId: String }
    // ]
})

const User = mongoose.model('user', userSchema);

module.exports = User;

