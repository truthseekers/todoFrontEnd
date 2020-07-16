import React, { useState } from 'react';

function ListForm(props) {

    const [taskField, setTaskField] = useState("");

    const handleChange = (event) => {
        setTaskField(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddList(taskField);

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input placeholder="Create a new List" type="text" value={taskField} onChange={handleChange} name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
}

export default ListForm;
