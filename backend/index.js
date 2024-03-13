import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_URL } from "./config.js";

const app = express();

app.get('/', (req, res) => {
  console.log(req)
  return res.status(234).send('<h1>Welcome to TuMoBooks App</h1>')
});

mongoose.connect(DB_URL)
  .then(() => {
    console.log('> Success: Application is connected to Database');
    app.listen(PORT, () => {
      console.log(`> Success: Server is listening to PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message)
  })
