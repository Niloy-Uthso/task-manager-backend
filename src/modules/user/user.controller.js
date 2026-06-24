 
import { userServer } from "./user.server.js";

 
 const registerUser = async (req, res) => {
    try {
        const { uid, name, email, photoURL } = req.body;

         if (!uid || !name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: uid, name, email'
            });
        }

        const userData = { uid, name, email, photoURL };
        const newUser = await userServer.createUser(userData);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.message === 'User already exists') {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userServer.getAllUsersFromDB();

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error('Get users error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const userController ={
    registerUser,
    getAllUsers
}