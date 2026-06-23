// backend/src/modules/blogs/blog.router.js
import express from 'express';
import { blogController } from './blog.controller.js';

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

export const blogRouter = router;