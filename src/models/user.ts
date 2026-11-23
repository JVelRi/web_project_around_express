import mongoose from 'mongoose';
import { websiteRegex } from '../utils/regex.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => websiteRegex.test(value),
      message: 'Debe ser una dirección web valida',
    },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
