const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Route to add a new todo
router.post('/todos', todoController.addTodo);

// Route to update the order of todos
router.put('/todos/order', todoController.updateTodoOrder);

// Route to toggle the completion status of a todo
router.patch('/todos/:id/toggle', todoController.toggleTodoCompletion);

module.exports = router;