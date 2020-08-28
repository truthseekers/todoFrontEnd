import React, { useContext } from "react";
import { TrashFill } from "react-bootstrap-icons";
import { AuthContext } from "./AuthContext";

function ListRow(props) {
  const [state, setState] = useContext(AuthContext);
  const handleListChange = () => {
    // console.log("listRow handleChange");
    setState((state) => ({ ...state, currentListId: props.id }));
  };

  const deleteRow = () => {
    props.onDeleteList(props.id);
  };

  return (
    <li className="list-row">
      <span style={{ cursor: "pointer" }} onClick={handleListChange}>
        {props.name}
      </span>
      {state.userId === props.postedBy.id && (
        <span>
          - <TrashFill onClick={deleteRow} />
        </span>
      )}
    </li>
  );
}

export default ListRow;
