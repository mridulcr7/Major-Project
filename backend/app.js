const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

const dbURI = "mongodb+srv://mridulpandey5277:Fw4IzuIAw0HaCgvK@cluster0.xd2hztf.mongodb.net/social_media";

mongoose.connect(dbURI)
    .then(() => {
        console.log("Let's go")
        app.listen(3000);
    })
    .catch(err => {
        console.log("ERROR!!")
        console.log(err)
    })


app.use('*', checkUser);
app.use(routes);