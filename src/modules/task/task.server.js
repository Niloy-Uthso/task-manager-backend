 
import { ObjectId } from "mongodb";
import { database } from "../../config/db.js";

 
 const createTaskInDB = async (taskData) => {
    const tasksCollection = database.collection('tasks');

    const newTask = {
        ...taskData,
        createdAt: new Date(taskData.createdAt),
        updatedAt: new Date()
    };

    const result = await tasksCollection.insertOne(newTask);

    if (!result.acknowledged) {
        throw new Error('Failed to create task');
    }

    return { ...newTask, _id: result.insertedId };
};

const getAllTasksFromDB = async (userId) => {
    const tasksCollection = database.collection('tasks');
    
    const tasks = await tasksCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
    
    return tasks;
};

// Add this function
const getTaskByIdFromDB = async (taskId, userId) => {
    const tasksCollection = database.collection('tasks');
    
    if (!ObjectId.isValid(taskId)) {
        throw new Error('Invalid task ID');
    }

    const task = await tasksCollection.findOne({
        _id: new ObjectId(taskId),
        userId
    });

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

// Add this function
const updateTaskInDB = async (taskId, userId, updateData) => {
    const tasksCollection = database.collection('tasks');

    if (!ObjectId.isValid(taskId)) {
        throw new Error('Invalid task ID');
    }

    const task = await tasksCollection.findOne({
        _id: new ObjectId(taskId),
        userId
    });

    if (!task) {
        throw new Error('Task not found');
    }

    const updatedTask = {
        ...updateData,
        updatedAt: new Date()
    };

    const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: updatedTask }
    );

    if (result.modifiedCount === 0) {
        throw new Error('Failed to update task');
    }

    return { ...task, ...updatedTask };
};

const deleteTaskFromDB = async (taskId, userId) => {
    const tasksCollection = database.collection('tasks');

    if (!ObjectId.isValid(taskId)) {
        throw new Error('Invalid task ID');
    }

    const task = await tasksCollection.findOne({
        _id: new ObjectId(taskId),
        userId
    });

    if (!task) {
        throw new Error('Task not found');
    }

    const result = await tasksCollection.deleteOne({
        _id: new ObjectId(taskId),
        userId
    });

    if (result.deletedCount === 0) {
        throw new Error('Failed to delete task');
    }

    return task;
};


export const taskServer ={
    createTaskInDB,
    getAllTasksFromDB,
    getTaskByIdFromDB,
    updateTaskInDB,
    deleteTaskFromDB
}