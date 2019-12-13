import express from 'express';
import Users from '../controllers/user';

const { createUsers } = Users;

const userRouter = express.Router();

userRouter.post('/auth/create-user', createUsers);

export default userRouter;
