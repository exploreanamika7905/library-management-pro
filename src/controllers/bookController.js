const Book = require('../models/bookModel');

// @desc Get All Books
// @route GET /api/books
// access public
exports.getAllBooks = async (req, res) => {
    try {
        const books  = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    } 
};

// @desc Get Book
// @route GET /api/books/:id
// access public
exports.createBook = async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(400).send(err);
    }
};

// @desc Create New Book Entry
// @route POST /api/books/:id
// access public
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
}

// @desc Update Book Entry
// @route PUT /api/books/:id
// access public
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!book) res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
}

// @desc Delete Book Entry
// @route PUT /api/library
// access public
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) res.status(404).send('Book not found');
        res.send('Book Deleted');
    } catch (err) {
        res.status(500).send(err);
    }
}
