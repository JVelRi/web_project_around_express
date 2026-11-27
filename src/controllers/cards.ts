import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card.js';

const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});
  const userId = req.user?._id;
  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));

  res.send(cardsWithIsLiked);
};

const createCard = async (req: Request, res: Response) => {
  if (!req.user) {
    throw Object.assign(new Error('No autorizado'), { statusCode: 401 });
  }
  if (!req.body) {
    throw Object.assign(new Error('No existe cuerpo en la petición'), {
      statusCode: 400,
    });
  }
  const card = await Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  });
  res.status(201).send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === req.user?._id),
  });
};

const deleteCard = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(String(req.params.id))) {
    throw Object.assign(new Error('ID invalido'), { statusCode: 400 });
  }
  const card = await Card.findByIdAndDelete(req.params.id);
  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      {
        statusCode: 404,
      },
    );
  }
  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === req.user?._id),
  });
};

const likeCard = async (req: Request, res: Response) => {
  if (!req.user) {
    throw Object.assign(new Error('No autorizado'), { statusCode: 401 });
  }
  if (!mongoose.Types.ObjectId.isValid(String(req.params.id))) {
    throw Object.assign(new Error('ID inválido'), { statusCode: 400 });
  }
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user?._id },
    },
    { new: true },
  );
  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      {
        statusCode: 404,
      },
    );
  }
  const userId = req.user?._id;
  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};

const dislikeCard = async (req: Request, res: Response) => {
  if (!req.user) {
    throw Object.assign(new Error('No autorizado'), { statusCode: 401 });
  }
  if (!mongoose.Types.ObjectId.isValid(String(req.params.id))) {
    throw Object.assign(new Error('ID inválido'), { statusCode: 400 });
  }
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { new: true },
  );
  if (!card) {
    throw Object.assign(
      new Error('No se encontró ninguna tarjeta con ese id'),
      {
        statusCode: 404,
      },
    );
  }
  const userId = req.user?._id;
  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};

export { getCards, createCard, deleteCard, likeCard, dislikeCard };
