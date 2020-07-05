import React from 'react';

function Todos(props) {

    return (
        <div>
            <div>Should return the current listId: </div>
            <div>Todo Items for List: {props.testProp}</div>
        </div>
    );
}

export default Todos;
