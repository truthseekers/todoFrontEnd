import React, { useState } from 'react';
import ListRow from './ListRow';

function Lists(props) {

    let rows = [];

    const handleListChange = (e) => {
        console.log("testProp: ");
        console.log(props.testProp);
        console.log("clicked!");
        console.log(e.target.id);
        // let newList = props.lists.filter((elem) => {
        //     if (e.target.id == elem.id) {
        //         return elem;
        //     }
        // })

        props.onChangeList(e.target.id);

    }

    console.log("props...");
    console.log(props.listsState.lists);

    props.listsState.lists.map((elem) => {
        // rows.push(<li id={elem.id} onClick={handleListChange}>{elem.name}</li>);
        rows.push(<ListRow id={elem.id} onDeleteList={props.onDeleteList} testProp={props.testProp} onSelect={props.onChangeList} name={elem.name} />);
    })

    const returnListName = () => {
        console.log("in returnListName");
        // return props.listsState.lists.find(element => element.id == props.currentListId);
        let result = props.listsState.lists.find((element) => {
            console.log("element id: " + element.id);
            console.log("props.currentListId: " + props.currentListId);
            return element.id == props.currentListId;
        });
        // console.log(result);
        return result.name;
    }

    // let currentList = lists.filter((elem) => {
    //     if (elem.id == props.currentListId) {
    //         return elem;
    //     }
    // })

    return (
        <div>
            <h3>Current Listyaa: {returnListName()}</h3>
            <h3>Your Lists:</h3>
            <ul>
                {rows}
            </ul>
            {/* <ListRow id="0" name="poo" />
            <ListRow id="1" name="poopie" /> */}
        </div>
    );
}

export default Lists;
