import React, { useState } from 'react';
import { TrashFill } from 'react-bootstrap-icons';


function TodoItem(props) {

    const [taskField, setTaskField] = useState(false);

    const deleteTodoItem = () => {
        props.deleteTodo(props.id);
    }

    const handleChange = () => {
        setTaskField(taskField == true ? false : true)
        props.checkTodo(props.id);
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={props.completed}
                onChange={handleChange}
            />
            {props.task} - <TrashFill onClick={deleteTodoItem} />
        </div>
    );
}

export default TodoItem;
