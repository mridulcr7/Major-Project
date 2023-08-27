const jwt = require('jsonwebtoken');
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'ss', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Login First"
                })
            } else {
                //  console.log(decodedToken);
                // let user = await User.findById(decodedToken.id);
                // console.log(user);
                // req.user = user;
                next();
            }
        });
    } else {
        //console.log(err);
        res.status(401).json({
            success: false,
            message: "Login First"
        })
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'ss', async (err, decodedToken) => {
            if (err) {
                req.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                console.log(user);
                req.user = user;
                next();
            }
        });
    } else {
        req.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };