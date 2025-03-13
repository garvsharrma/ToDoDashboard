const router = require('express').Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort('position');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create todo
router.post('/', async (req, res) => {
  try {
    const count = await Todo.countDocuments();
    const todo = new Todo({
      ...req.body,
      position: count
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update positions
router.post('/reorder', async (req, res) => {
  try {
    const updates = req.body.map(({ id, position }) => ({
      updateOne: {
        filter: { _id: id },
        update: { position }
      }
    }));
    await Todo.bulkWrite(updates);
    res.json({ message: 'Positions updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
