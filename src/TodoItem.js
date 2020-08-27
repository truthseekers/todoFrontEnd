import React, { useContext } from "react";
import { TrashFill } from "react-bootstrap-icons";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "./queries";
import { AuthContext } from "./AuthContext";

function TodoItem(props) {
  const [state, setState] = useContext(AuthContext);
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM, {
    variables: {
      todo: props.id,
      isCompleted: !props.completed,
    },
  });

  const deleteTodoItem = () => {
    props.deleteTodo(props.id);
  };

  const handleChange = () => {
    updateTodo();
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={handleChange}
      />
      {props.task} (By: {props.postedBy.name})
      {props.postedBy.id === state.userId && (
        <span>
          - <TrashFill onClick={deleteTodoItem} />
        </span>
      )}
    </div>
  );
}

export default TodoItem;
