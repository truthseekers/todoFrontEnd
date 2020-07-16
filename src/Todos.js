import React from 'react';
import TodoItem from './TodoItem';

function Todos(props) {

    let rows = [];

    props.todos.map((elem) => {
        if (elem.listId === props.listId) {
            rows.push(<TodoItem id={elem.id} deleteTodo={props.deleteTodo} checkTodo={props.checkTodo} completed={elem.completed} task={elem.task} />);
        }
        return 0;
    });

    return (
        <div>
            {rows}
        </div>
    );
}

export default Todos;
