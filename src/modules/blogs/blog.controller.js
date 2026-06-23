// backend/src/modules/blogs/blog.controller.js
import { blogServer } from './blog.server.js';

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogServer.getAllBlogsFromDB();

        return res.status(200).json({
            success: true,
            data: blogs
        });

    } catch (error) {
        console.error('Get blogs error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogServer.getBlogByIdFromDB(id);

        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        console.error('Get blog error:', error);
        
        if (error.message === 'Blog not found' || error.message === 'Invalid blog ID') {
            return res.status(404).json({
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

export const blogController = {
    getAllBlogs,
    getBlogById
};