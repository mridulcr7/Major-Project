const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require('jsonwebtoken');

module.exports.create_post = async (req, res) => {
    try {
        //console.log(req.id);
        const postdata = {
            content: req.body.content,
            tags: req.body.tags,
            owner: req.user._id
        }
        const post = await Post.create(postdata);
        const user = req.user;
        //console.log(user);
        //console.log(post._id);
        user.posts.push(post._id);
        await user.save();
        //console.log(user);
        res.status(200).json({
            success: true,
            post
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.like_post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.includes(req.user._id)) {
            const user = req.user;
            const index1 = post.likes.indexOf(user._id);
            post.likes.splice(index1, 1);
            const index2 = user.likedPost.indexOf(user._id);
            user.likedPost.splice(index2, 1);
            await post.save();
            await user.save();
            res.status(200).json({
                success: true,
                message: "Unliked"
            })
        }
        else {
            post.likes.push(req.user._id);
            const user = req.user;
            user.likedPost.push(post._id);
            await post.save();
            await user.save();
            res.status(200).json({
                success: true,
                message: "Liked"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.delete_post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
      //  console.log(post._id);
        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        const user = req.user;
        if ((user._id).equals(post.owner)) {
            const index = user.posts.indexOf(post.id);
            user.posts.splice(index, 1);
            await Post.deleteOne({ _id: req.params.id });
            await user.save();
            res.status(200).json({
                success: true,
                message: "Post Deleted"
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            }) 
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports.update_post = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedData = {
            content: req.body.content,
            tags: req.body.tags
        };

      
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        
        if (!post.owner.equals(req.user._id)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

       
        post.content = updatedData.content;
        post.tags = updatedData.tags;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
