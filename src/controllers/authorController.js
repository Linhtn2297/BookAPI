// /controllers/authorController.js
const { authors } = require('../data/mockData');

exports.getAllAuthors = (req, res) => {
    res.json(authors);
};

exports.getAuthorById = (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found.');
    res.json(author);
};

exports.createAuthor = (req, res) => {
    const author = {
        id: authors.length + 1,
        name: req.body.name
    };
    authors.push(author);
    res.status(201).json(author);
};

exports.updateAuthor = (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found.');

    author.name = req.body.name;
    
    res.json(author);
};

exports.deleteAuthor = (req, res) => {
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (authorIndex === -1) return res.status(404).send('Author not found.');

    authors.splice(authorIndex, 1);
    res.status(204).send();
};
