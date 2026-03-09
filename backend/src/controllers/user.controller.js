import {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        // basic validation
        if ( !userName || !email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'})
        }

        //check if user already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({message: 'User already exists'});
        }

        //create user
        const user = await User.create({
            userName,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            mesasge: 'User registered successfully',
            user: {
                id: user._id, email: user.email, userName: user.userName 
            }
        });



    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
};

export {registerUser}