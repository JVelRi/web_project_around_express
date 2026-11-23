import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';

const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(String(req.params._id))) {
    throw Object.assign(new Error('No se encontró ningun usuario con ese id'), {
      statusCode: 404,
    });
  }

  const user = await User.findById(req.params._id);
  res.send(user);
};

const createUser = async (req: Request, res: Response) => {
  const user = await User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  });
  res.status(201).send(user);
};

const getUserMe = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(String(req.user?._id))) {
    throw Object.assign(new Error('No se encontró ningun usuario con ese id'), {
      statusCode: 404,
    });
  }

  const user = await User.findById(req.user?._id);
  res.send(user);
};

const updateUserMe = async (req: Request, res: Response) => {
  if (!req.user) {
    throw Object.assign(new Error('No autorizado'), { statusCode: 401 });
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!user) {
    throw Object.assign(new Error('No se encontró ningun usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.send(user);
};

const updateUserAvatarMe = async (req: Request, res: Response) => {
  if (!req.user) {
    throw Object.assign(new Error('No autorizado'), { statusCode: 401 });
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!user) {
    throw Object.assign(new Error('No se encontró ningun usuario con ese id'), {
      statusCode: 404,
    });
  }
  res.send(user);
};

export {
  getUsers,
  getUserById,
  createUser,
  getUserMe,
  updateUserMe,
  updateUserAvatarMe,
};
