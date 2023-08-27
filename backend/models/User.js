const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter first name']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter first name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    academicinfo:
    {
        year: String,
        branch: String,
        sec: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likedPost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

//hashing password

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const User = mongoose.model('user', userSchema);

module.exports = User;

