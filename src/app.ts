import express from 'express';
import mongoose from 'mongoose';
import { logRequest } from './middleware/logger.js';
import router from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';
mongoose
  .connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch((err) => console.error('Error de conexión', err));

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6b04bf15648f9ab4cd0b1891',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logRequest);
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

const port = 3000;
