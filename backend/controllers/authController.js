const User = require("../models/User");
const jwt = require('jsonwebtoken');


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {firstname:'',lastname:'', email: '', password: '' };

    // unique email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


// create json web token
const maxAge = 3 * 24 * 60 * 60;//in seconds
const createToken = (id) => {
    return jwt.sign({ id }, 'ss', {
        expiresIn: maxAge
    });
};


module.exports.signup_post = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await User.create({ firstname, lastname, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: "logged out"
        })
        //res.redirect('/');
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
   
}