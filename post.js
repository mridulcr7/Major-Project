const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: user
        }
    ],
    comment: [
        {
            user: String,
            content: String,
            time: {
                type: Date,
                default: new Date.now
            }
        }
    ]
}, { timestamps: true });


