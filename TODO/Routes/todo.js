const router = require('express').Router();
const Todo = require('../Models/todo');

// List all todos
router.get('/', (req, res) => {
  Todo.find().exec((err, todos) => {
    if (err) return res.json({ error: err });
    return res.json({ data: todos });
  });
});

// Create todo
router.post('/create', (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
  });

  todo.save((err, todo) => {
    if (err) return res.json({ error: err });
    return res.json({ data: todo });
  });
});

// Edit todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id).exec((err, todo) => {
    if (err) return res.json({ error: err });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.title = req.body.title ?? todo.title;
    todo.content = req.body.content ?? todo.content;
    todo.completed = req.body.completed ?? todo.completed;

    todo.save((err, updatedTodo) => {
      if (err) return res.json({ error: err });
      return res.json({ data: updatedTodo });
    });
  });
});

// Delete todo
router.delete('/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }).exec((err, result) => {
    if (err) return res.json({ error: err });
    if (result.deletedCount === 0) {
      return res.json({ data: 'No Todo Found with given id' });
    }
    return res.json({ data: 'Deleted Successfully' });
  });
});

// Creating a new Todo for a user
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; // assuming auth middleware adds user

  try {
    const todo = await Todo.create({ title, description, user: userId });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = router;
