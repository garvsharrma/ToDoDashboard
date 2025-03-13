import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${API_URL}/todos`);
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        const response = await axios.post(`${API_URL}/todos`, { title });
        setTodos([...todos, response.data]);
    };

    const toggleTodoCompletion = async (id) => {
        const updatedTodos = todos.map(todo => 
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
        );
        await axios.patch(`${API_URL}/todos/${id}/toggle`);
        setTodos(updatedTodos);
    };

    const updateTodoOrder = async (newOrder) => {
        await axios.put(`${API_URL}/todos/order`, { order: newOrder });
        setTodos(newOrder);
    };

    return (
        <TodoContext.Provider value={{ 
            todos, 
            addTodo, 
            toggleTodoCompletion, 
            updateTodoOrder
        }}>
            {children}
        </TodoContext.Provider>
    );
};