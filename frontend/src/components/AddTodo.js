import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import styled from '@emotion/styled';

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
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

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo({ title, completed: false });
            setTitle('');
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
                required
            />
            <button type="submit">Add Todo</button>
        </StyledForm>
    );
};

export default AddTodo;