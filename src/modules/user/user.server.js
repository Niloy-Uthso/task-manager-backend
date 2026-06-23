// backend/src/modules/users/user.server.js
import { database } from '../../config/db.js';

 const createUser = async (userData) => {
    const { uid, name, email, photoURL } = userData;

    const usersCollection = database.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
        $or: [{ uid }, { email }]
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create new user
    const newUser = {
        uid,
        name,
        email,
        photoURL: photoURL || null,
        createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);

    if (!result.acknowledged) {
        throw new Error('Failed to create user');
    }

    return newUser;
};

export const userServer=
 { 
    createUser, 
     
    
    };