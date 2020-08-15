import React, { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
// import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import Loader from "react-loader";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "./queries";

// const TODO_ITEM = gql`
//   mutation deleteTodoItem($todo: ID!) {
//     deleteTodo(todoId: $todo) {
//       id
//       name
//     }
//   }
// `;

function TodoItem(props) {
  const [taskField, setTaskField] = useState(false);

  const [updateTodo] = useMutation(UPDATE_TODO_ITEM, {
    variables: {
      todo: props.id,
      isCompleted: !props.completed,
    },
  });

  //console.log("props in TodoItem: ");
  //console.log(props);
  // const [deleteTodo, todoDeleteMutation] = useMutation(TODO_ITEM);

  const deleteTodoItem = () => {
    // console.log("deleting???");
    // deleteTodo({
    //   variables: { todo: props.id },
    // });
    props.deleteTodo(props.id);
  };

  const handleChange = () => {
    //console.log("clicked Checkbox");
    updateTodo();
    // setTaskField(taskField === true ? false : true);
    // props.checkTodo(props.id);
  };

  //console.log("props in TodoItem?");
  //console.log(props);

  return (
    <div>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={handleChange}
      />
      {props.task} (By: {props.postedBy}) -{" "}
      <TrashFill onClick={deleteTodoItem} />
    </div>
  );
}

export default TodoItem;
