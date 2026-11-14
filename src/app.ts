import express from 'express';
import { logRequest } from './middleware/logger.js';
import router from './routes/index.js';
const app = express();

app.use(logRequest);

app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
