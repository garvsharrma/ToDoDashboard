import React from 'react';
import styled from '@emotion/styled';

const StyledTodoItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  span {
    flex: 1;
  }
`;

const TodoItem = ({ todo, onToggle }) => {
    return (
        <StyledTodoItem className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => onToggle(todo._id)} 
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
            </span>
        </StyledTodoItem>
    );
};

export default TodoItem;