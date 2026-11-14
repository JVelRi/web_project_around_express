import type { RequestHandler } from 'express';
import type { User } from '../types/user.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const userPath = path.join(import.meta.dirname, '../../data/users.json');

const readUsers = async (): Promise<User[]> => {
  const usersFile = await fs.readFile(userPath, 'utf8');
  return JSON.parse(usersFile);
};

const getUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await readUsers();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error has ocurred on the server' });
  }
};

const getUserById: RequestHandler = async (req, res) => {
  try {
    const users = await readUsers();
    const userId = req.params._id;

    const user = users.find((u) => u._id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User ID not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error has ocurred on the server' });
  }
};

export { getUsers, getUserById };
