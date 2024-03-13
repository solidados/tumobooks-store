import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_URL } from './config.js';
import { Book } from './models/book.model.js';

const app = express();

// middleware to parse req.body
app.use(express.json());

//* CRUD Routes:
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('<h1>Welcome to TuMoBooks App</h1>');
});

//* Route - POST New Book
app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: 'Fields: title, author, publishYear - required' });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

//* Route - GET All Books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

//* Route - GET Book by /:id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

//* Route - PUT Book by /:id
app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: 'Fields: title, author, publishYear - required' });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    !result
      ? res.status(404).json({ message: 'Fail! Book was not found' })
      : res.status(200).send({ message: 'Success! Book was updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

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
