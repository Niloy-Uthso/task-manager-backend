// backend/src/modules/blogs/blog.server.js
import { database } from '../../config/db.js';
import { ObjectId } from 'mongodb';

const getAllBlogsFromDB = async () => {
    const blogsCollection = database.collection('blogs');
    
    const blogs = await blogsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    
    return blogs;
};

const getBlogByIdFromDB = async (blogId) => {
    const blogsCollection = database.collection('blogs');
    
    if (!ObjectId.isValid(blogId)) {
        throw new Error('Invalid blog ID');
    }

    const blog = await blogsCollection.findOne({
        _id: new ObjectId(blogId)
    });

    if (!blog) {
        throw new Error('Blog not found');
    }

    return blog;
};

export const blogServer = {
    getAllBlogsFromDB,
    getBlogByIdFromDB
};