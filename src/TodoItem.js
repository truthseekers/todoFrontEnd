import React, { useState } from 'react';

function TodoItem(props) {

    const [taskField, setTaskField] = useState(false);

    const deleteTodoItem = () => {
        props.deleteTodo(props.id);
    }

    const handleChange = () => {
        //console.log("checked!");
        setTaskField(taskField == true ? false : true)
        //console.log(props.id);
        props.checkTodo(props.id);
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={props.completed}
                onChange={handleChange}
            />
            {props.task} - <span onClick={deleteTodoItem}>Trash</span>
        </div>
    );
}

export default TodoItem;
