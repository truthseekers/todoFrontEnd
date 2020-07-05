import React from 'react';

function ListRow(props) {

    const handleListChange = () => {
        //console.log("props.testProp: ");
        //console.log(props.testProp);
        // console.log(props.id);
        props.onSelect(props.id);
    }

    const deleteRow = () => {
        //console.log("deleting " + props.name);
        props.onDeleteList(props.id);
    }

    return (
        <div className="listItem">
            <span onClick={handleListChange}>(id: {props.id} ) {props.name}</span> - <span onClick={deleteRow}>Trash</span>
        </div>
    );
}

export default ListRow;
