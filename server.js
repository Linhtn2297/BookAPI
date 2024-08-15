const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "Book One", authorIds: [1] },
    { id: 2, title: "Book Two", authorIds: [2] }
];

let authors = [
    { id: 1, name: "Author One" },
    { id: 2, name: "Author Two" }
];

// --- Books Endpoints ---

// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Chuyển điều khiển sang middleware tiếp theo
});

// GET /books - Retrieve a list of all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        authorIds: []  // Initialize with an empty array
    };
    books.push(book);
    res.status(201).json(book);
});

// PUT /books/:id - Update a specific book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title;
    book.authorIds = req.body.authorIds; // Allow updating author IDs
    res.json(book);
});

// DELETE /books/:id - Delete a specific book by ID
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const index = books.indexOf(book);
    books.splice(index, 1);
    res.status(204).send();
});

// GET /books/:id/authors - Retrieve the author(s) of a book
app.get('/books/:id/authors', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const bookAuthors = authors.filter(a => book.authorIds.includes(a.id));
    res.json(bookAuthors);
});

// POST /books/:id/authors - Add an author to a book
app.post('/books/:id/authors', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const author = authors.find(a => a.id === req.body.authorId);
    if (!author) return res.status(404).send({error_code: 9999, message: 'Author not found' });

    if (!book.authorIds.includes(author.id)) {
        book.authorIds.push(author.id);
    }
    res.status(201).json(book);
});

// Server listens on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
