import React from "react";
import { TrashFill } from "react-bootstrap-icons";

function ListRow(props) {
  const handleListChange = () => {
    props.onSelect(props.id);
  };

  const deleteRow = () => {
    props.onDeleteList(props.id);
  };

  console.log(props.loggedInUser);
  console.log(props.postedBy);

  return (
    <li className="list-row">
      <span onClick={handleListChange}>{props.name}</span>
      {props.loggedInUser.id == props.postedBy.id && (
        <span>
          - <TrashFill onClick={deleteRow} />
        </span>
      )}
    </li>
  );
}

export default ListRow;
