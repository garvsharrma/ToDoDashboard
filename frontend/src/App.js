import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import styled from '@emotion/styled';
import './styles/global.css';
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const Title = styled.h1`
  color: var(--text-color);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  button {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const TodoItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }

  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  a {
    margin-left: auto;
    color: var(--primary-color);
    text-decoration: none;
    padding: 0.25rem 0.75rem;
    border: 1px solid currentColor;
    border-radius: 0.25rem;

    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 0.5rem;
  margin: 1rem 0;
  border-radius: 0.25rem;
  background-color: #fee2e2;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', link: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await axios.post(`${API_URL}/todos`, newTodo);
      setNewTodo({ title: '', link: '' });
      await fetchTodos();
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    try {
      setIsLoading(true);
      setError(null);

      const items = Array.from(todos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const updatedTodos = items.map((item, index) => ({
        ...item,
        position: index
      }));

      setTodos(updatedTodos);
      
      await axios.post(`${API_URL}/todos/reorder`, 
        updatedTodos.map((todo, index) => ({
          id: todo._id,
          position: index
        }))
      );
    } catch (err) {
      setError('Failed to reorder todos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.patch(`${API_URL}/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Todo Dashboard</Title>
      
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={newTodo.link}
          onChange={(e) => setNewTodo({...newTodo, link: e.target.value})}
        />
        <button type="submit">Add Todo</button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadingSpinner />}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <TodoItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo._id, todo.completed)}
                      />
                      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.title}
                      </span>
                      {todo.link && (
                        <a href={todo.link} target="_blank" rel="noopener noreferrer">
                          Link
                        </a>
                      )}
                    </TodoItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isLoading && <p>Loading...</p>}
    </Container>
  );
}

export default App;