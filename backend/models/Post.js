const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    tags: [
        {
            type:String
        }
    ],
    image: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
    // comment: [
    //     {
    //         userId: 94,
    //         message: 3901,
    //         reply: [
    //             {
    //                 ref: 9,
    //                 userId: 94,
    //                 message: "hello world"
    //             }
    //         ]
    //     }
    // ]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;


