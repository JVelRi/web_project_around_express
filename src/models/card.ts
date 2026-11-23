import mongoose from 'mongoose';
import { websiteRegex } from '../utils/regex.js';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => websiteRegex.test(value),
      message: 'Debe ser una dirección web valida',
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
