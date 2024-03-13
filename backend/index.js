import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, DB_URL } from './config.js';
import booksRouter from './routes/booksRouter.js';

const app = express();

// middleware to parse req.body
app.use(express.json());

// middleware to handle CORS policy
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedMethods: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('<h1>Welcome to TuMoBooks App</h1>');
});

app.use('/books', booksRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('> Success: Application is connected to Database');
    app.listen(PORT, () => {
      console.log(`> Success: Server is listening to PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
