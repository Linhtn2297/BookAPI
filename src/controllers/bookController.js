// /controllers/bookController.js
const { books } = require('../data/mockData');

exports.getAllBooks = (req, res) => {
    res.json(books);
};

exports.getBookById = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');
    res.json(book);
};

exports.createBook = (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        authorId: req.body.authorId,
        yearPublished: req.body.yearPublished,
        publisher: req.body.publisher,
        categoryId: req.body.categoryId,
        stock: req.body.stock
    };
    books.push(book);
    res.status(201).json(book);
};

exports.updateBook = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');

    book.title = req.body.title;
    book.authorId = req.body.authorId;
    book.yearPublished = req.body.yearPublished;
    book.publisher = req.body.publisher;
    book.categoryId = req.body.categoryId;
    book.stock = req.body.stock;
    
    res.json(book);
};

exports.deleteBook = (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found.');

    books.splice(bookIndex, 1);
    res.status(204).send();
};
