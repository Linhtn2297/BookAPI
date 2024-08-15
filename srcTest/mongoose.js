const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error:', error);
});

// Create book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    publicationDate: { type: Date },
    genre: { type: String },
    price: { type: Number, min: 0 }
});

const Book = mongoose.model('Book', bookSchema);

// Insert new book
const newBook = new Book({
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro',
    ISBN: '9781785885587',
    publicationDate: new Date('2016-07-29'),
    genre: 'Programming',
    price: 45.00
});

newBook.save().then(() => {
    console.log('Book saved successfully');
}).catch((error) => {
    console.error('Error saving book:', error);
});

// Find one book
Book.findOne({ title: 'Node.js Design Patterns' }).then((book) => {
    console.log('Found book:', book);
}).catch((error) => {
    console.error('Error finding book:', error);
});

// Update one book
Book.updateOne({ title: 'Node.js Design Patterns' }, { price: 40.00 }).then(() => {
    console.log('Book updated successfully');
}).catch((error) => {
    console.error('Error updating book:', error);
});

// Delete one book
Book.deleteOne({ title: 'Node.js Design Patterns' }).then(() => {
    console.log('Book deleted successfully');
}).catch((error) => {
    console.error('Error deleting book:', error);
});




