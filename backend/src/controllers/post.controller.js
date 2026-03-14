import { Post } from '../models/post.model.js';

//create a post
const createPost = async (req, res) => {
    try {

        const {name, description, age} = req.body;

        if(!name || !description || !age) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const post = await Post.create({name, description, age});

        res.status(201).json({
            message: "Post create suscessfuly", post
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error",
            error: error.message
        });
        
    }
}

//Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error",
            error: error.message
        });
        
    }
}

const updatePost = async (req, res) => {
    try {
        //basic validation for if body is empty
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            {new:true}
        );

        if(!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post updated successfully",post
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error",
            error: error.message
        });
    }
}

const deletePost = async (req, res) => {
    try {

        const deletePost = await Post.findByIdAndDelete(req.params.id);

        if(!deletePost) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error",
            error: error.message
        });
    }
}
export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
