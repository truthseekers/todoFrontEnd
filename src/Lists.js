import React, { useState } from "react";
import ListRow from "./ListRow";
import { useQuery, gql } from "@apollo/client";

function Lists(props) {
  let rows = [];

  // const handleListChange = (e) => {
  //     props.onChangeList(e.target.id);
  // }

  props.listsState.lists.map((elem) => {
    // rows.push(<li id={elem.id} onClick={handleListChange}>{elem.name}</li>);
    rows.push(
      <ListRow
        id={elem.id}
        onDeleteList={props.onDeleteList}
        testProp={props.testProp}
        onSelect={props.onChangeList}
        name={elem.name}
      />
    );
  });

  const returnListName = () => {
    //console.log("in returnListName");
    // return props.listsState.lists.find(element => element.id == props.currentListId);
    // console.log("props.currentListId");
    // console.log(props.currentListId);
    let result = props.listsState.lists.find(
      (element) => element.id == props.currentListId
    );
    return result.name;
  };

  return (
    <div>
      <h3>Current List: {returnListName()}</h3>
      <h3>Your Lists:</h3>
      {/* <ul>{rows}</ul> */}
    </div>
  );
}

export default Lists;
