import React from "react";
import ListRow from "./ListRow";

function Lists(props) {
  let rows = [];

  props.lists.map((elem) => {
    rows.push(
      <ListRow
        key={elem.id.toString()}
        id={elem.id}
        onDeleteList={props.onDeleteList}
        name={elem.title}
        postedBy={elem.postedBy}
      />
    );
  });

  return (
    <div>
      <h3>Your Lists:</h3>
      <ul>{rows}</ul>
    </div>
  );
}

export default Lists;
