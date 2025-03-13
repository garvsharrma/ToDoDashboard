const Todo = require('../models/todoModel');

// Add a new todo item
exports.addTodo = async (req, res) => {
    const { title } = req.body;
    try {
        const newTodo = new Todo({ title, completed: false, order: 0 });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error });
    }
};

// Update the order of todos
exports.updateTodoOrder = async (req, res) => {
    const { todos } = req.body;
    try {
        const updatePromises = todos.map((todo) =>
            Todo.findByIdAndUpdate(todo._id, { order: todo.order }, { new: true })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Todos reordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo order', error });
    }
};

// Toggle todo completion status
exports.toggleTodoCompletion = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling todo completion', error });
    }
};