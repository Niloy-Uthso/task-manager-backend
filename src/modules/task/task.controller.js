 import {  taskServer } from './task.server.js';

 const createTask = async (req, res) => {
    try {
        const { title, description, status, userId, userEmail,createdAt } = req.body;

         if (!title || !description || !status || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, description, status, userId'
            });
        }

        const taskData = { title, description, status, userId, userEmail,createdAt };
        console.log("shihfsoidfsdf",taskData)

        const newTask = await taskServer.createTaskInDB(taskData);

        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });

    } catch (error) {
        console.error('Create task error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        const tasks = await taskServer.getAllTasksFromDB(userId);

        return res.status(200).json({
            success: true,
            data: tasks
        });

    } catch (error) {
        console.error('Get tasks error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

 const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        const task = await taskServer.getTaskByIdFromDB(id, userId);

        return res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        console.error('Get task error:', error);
        
        if (error.message === 'Task not found' || error.message === 'Invalid task ID') {
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

 const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (status) updateData.status = status;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        const updatedTask = await taskServer.updateTaskInDB(id, userId, updateData);

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });

    } catch (error) {
        console.error('Update task error:', error);
        
        if (error.message === 'Task not found' || error.message === 'Invalid task ID') {
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
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        const deletedTask = await taskServer.deleteTaskFromDB(id, userId);

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });

    } catch (error) {
        console.error('Delete task error:', error);
        
        if (error.message === 'Task not found' || error.message === 'Invalid task ID') {
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

export const taskController ={
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}