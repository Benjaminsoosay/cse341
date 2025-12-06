const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    
    if (!req.body.title || !req.body.author) {
      return res.status(400).json({ error: 'Title and author required' });
    }
    
    const book = new Book({
      ...req.body,
      userId: req.user.id 
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const updateBook = async (req, res) => {
  try {
    
    if (req.body.year && req.body.year < 1000) {
      return res.status(400).json({ error: 'Invalid year' });
    }
    
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    
  
    if (book.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    
    
    if (book.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await book.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};