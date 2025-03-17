import express from 'express';
import { loginUser, registerUser, adminLogin, getCurrentUserProfile } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/get', getCurrentUserProfile);

export default userRouter;