import React, { useState } from 'react';
// import List from './List';

let defaultLists = [
    { id: 0, name: "shopping" },
    { id: 1, name: "todos" },
    { id: 2, name: "travel" },
    { id: 3, name: "business" }
]

function Lists(props) {

    const [lists, setLists] = useState(defaultLists);

    let rows = [];

    const handleListChange = (e) => {
        console.log("clicked!");
        console.log(e.target.id);
        let newList = lists.filter((elem) => {
            if (e.target.id == elem.id) {
                return elem;
            }
        })

        props.onChangeList(newList);

    }


    lists.map((elem) => {
        rows.push(<li id={elem.id} onClick={handleListChange}>{elem.name}</li>);
    })

    // let currentList = lists.filter((elem) => {
    //     if (elem.id == props.currentListId) {
    //         return elem;
    //     }
    // })

    // console.log("currentList: ");
    // console.log(currentList);


    return (
        <div style={{ display: 'flex' }}>
            <h3>Current List: {props.currentList.name}</h3>
            <ul>
                {rows}
            </ul>
        </div>
    );
}

export default Lists;
