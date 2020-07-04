import React, { useState } from 'react';

function ListForm(props) {

    const [taskField, setTaskField] = useState("");

    const handleChange = (event) => {
        console.log("something inserted");
        setTaskField(event.target.value)
    }

    const handleSubmit = (event) => {
        console.log("form submitted");
        // console.log(event.target.value);
        event.preventDefault();
        props.onAddTodo(taskField);

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={taskField} onChange={handleChange} name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
}

export default ListForm;
