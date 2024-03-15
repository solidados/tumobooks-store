import express from 'express';
import { Book } from '../models/book.model.js';

const router = express.Router();

//* Route - POST New Book
router.post('/', async (req, res) => {
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
      description: req.body.description,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

//* Route - GET All Books
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

//* Route - DELETE Book by /:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    !result
      ? res.status(404).json({ message: 'Fail! Book was not found' })
      : res.status(200).send({ message: 'Success! Book was deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
