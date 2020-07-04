import React, { useState } from 'react';

function TodoItem(props) {

    const [taskField, setTaskField] = useState(false);


    const handleChange = () => {
        // console.log("checked!");
        setTaskField(taskField == true ? false : true)
        // console.log(props.id);
        props.handleTodo(props.id);
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={props.completed}
                onChange={handleChange}
            />
            {props.task}
        </div>
    );
}

export default TodoItem;
