import React, { useState } from 'react';
import ListRow from './ListRow';

function Lists(props) {

    let rows = [];

    const handleListChange = (e) => {
        props.onChangeList(e.target.id);
    }

    props.listsState.lists.map((elem) => {
        // rows.push(<li id={elem.id} onClick={handleListChange}>{elem.name}</li>);
        rows.push(<ListRow id={elem.id} onDeleteList={props.onDeleteList} testProp={props.testProp} onSelect={props.onChangeList} name={elem.name} />);
    })

    const returnListName = () => {
        //console.log("in returnListName");
        // return props.listsState.lists.find(element => element.id == props.currentListId);
        console.log("props.currentListId");
        console.log(props.currentListId);
        let result = props.listsState.lists.find(element => element.id == props.currentListId);
        // let result = props.listsState.lists.find((element) => {
        //     console.log("element in returnListName: ");
        //     console.log(element);
        //     console.log("props.currentListId: ");
        //     console.log(props.currentListId);
        //     //console.log("props.currentListId: " + props.currentListId);
        //     return element.id == props.currentListId;
        // });
        console.log("final result is...");
        console.log(result);
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
