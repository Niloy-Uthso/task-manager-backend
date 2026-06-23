 import express from 'express';
import {  taskController } from './task.controller.js';

const router = express.Router();

router.post('/create-task', taskController.createTask);

router.get('/get-all-tasks', taskController.getAllTasks); 
router.get('/get-task-by-id/:id', taskController.getTaskById); 
router.put('/update-task-by-id/:id', taskController.updateTask); 
router.delete('/delete-task-by-id/:id', taskController.deleteTask); 

export const  taskRouter=router;