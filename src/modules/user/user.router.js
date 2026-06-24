 import express from 'express';
import { userController } from './user.controller.js';
 
const router = express.Router();

router.post('/register',userController.registerUser );
router.get('/get-all-users', userController.getAllUsers); 

export const  UserRouter=router;