import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
    const { todos, updateTodoOrder } = useContext(TodoContext);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTodos = Array.from(todos);
        const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, movedTodo);

        updateTodoOrder(reorderedTodos);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todoList">
                {(provided) => (
                    <ul
                        className="todo-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {todos.map((todo, index) => (
                            <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                {(provided) => (
                                    <TodoItem
                                        todo={todo}
                                        provided={provided}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;