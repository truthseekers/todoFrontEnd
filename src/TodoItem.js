import React, { useState } from "react";
import { TrashFill } from "react-bootstrap-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";

const TODO_ITEM = gql`
  mutation deleteTodoItem($todo: ID!) {
    deleteTodo(todoId: $todo) {
      id
      name
    }
  }
`;

function TodoItem(props) {
  const [taskField, setTaskField] = useState(false);

  const [deleteTodo, todoDeleteMutation] = useMutation(TODO_ITEM);

  const deleteTodoItem = () => {
    // props.deleteTodo(props.id);
    deleteTodo({
      variables: { todo: props.id },
    });
  };

  const handleChange = () => {
    setTaskField(taskField == true ? false : true);
    props.checkTodo(props.id);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={handleChange}
      />
      {props.task} - <TrashFill onClick={deleteTodoItem} />
    </div>
  );
}

export default TodoItem;
