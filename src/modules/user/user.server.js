 import { database } from '../../config/db.js';

 const createUser = async (userData) => {
    const { uid, name, email, photoURL } = userData;

    const usersCollection = database.collection("users");

     const existingUser = await usersCollection.findOne({
        $or: [{ uid }, { email }]
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

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

const getAllUsersFromDB = async () => {
    const usersCollection = database.collection("users");
    
    const users = await usersCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    
    return users;
};

export const userServer=
 { 
    createUser, 
     getAllUsersFromDB
    
    };