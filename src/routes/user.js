import express from 'express';
import Users from '../controllers/user';
import UserAuth from '../middleware/auth';

const { createUsers } = Users;
const { isAdmin } = UserAuth;

const userRouter = express.Router();

userRouter.post('/auth/create-user', isAdmin, createUsers);

export default userRouter;
