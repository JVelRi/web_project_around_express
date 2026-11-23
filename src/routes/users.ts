import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  getUserMe,
  updateUserMe,
  updateUserAvatarMe,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserMe);
usersRouter.patch('/me/avatar', updateUserAvatarMe);
usersRouter.patch('/me', updateUserMe);
usersRouter.get('/:_id', getUserById);
usersRouter.post('/', createUser);

export { usersRouter };
