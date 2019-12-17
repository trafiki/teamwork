import express from 'express';
import Users from '../controllers/user';
import UserAuth from '../middleware/auth';

const { createUsers, loginUsers } = Users;
const { isAdmin } = UserAuth;

const userRouter = express.Router();

userRouter.post('/auth/create-user', isAdmin, createUsers);
userRouter.post('/auth/signin', loginUsers);

export default userRouter;
