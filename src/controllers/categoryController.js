// /controllers/categoryController.js
const { categories } = require('../data/mockData');

exports.getAllCategories = (req, res) => {
    res.json(categories);
};

exports.getCategoryById = (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found.');
    res.json(category);
};

exports.createCategory = (req, res) => {
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.status(201).json(category);
};

exports.updateCategory = (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found.');

    category.name = req.body.name;
    
    res.json(category);
};

exports.deleteCategory = (req, res) => {
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (categoryIndex === -1) return res.status(404).send('Category not found.');

    categories.splice(categoryIndex, 1);
    res.status(204).send();
};
