import React from "react";
import { TrashFill } from "react-bootstrap-icons";

function ListRow(props) {
  const handleListChange = () => {
    props.onSelect(props.id);
  };

  const deleteRow = () => {
    props.onDeleteList(props.id);
  };

  return (
    <li className="list-row">
      <span onClick={handleListChange}>{props.name}</span> -{" "}
      <TrashFill onClick={deleteRow} />
    </li>
  );
}

export default ListRow;
