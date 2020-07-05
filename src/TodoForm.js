import React, { useState } from 'react';

function TodoForm(props) {

    const [taskField, setTaskField] = useState("");


    const handleSubmit = (event) => {

        event.preventDefault();
        props.onAddTodo({
            listId: props.listId,
            todo: taskField
        })
    }

    const handleChange = (event) => {
        setTaskField(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Todo:
                    <input type="text" value={taskField} onChange={handleChange} name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );

}


export default TodoForm;
