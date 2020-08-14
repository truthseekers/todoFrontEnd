import React from "react";
import TodoItem from "./TodoItem";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "./queries";

function Todos(props) {
  let rows = [];

  const [updateTodo] = useMutation(UPDATE_TODO_ITEM, {
    variables: {
      todoId: props.id,
    },
  });
  // update(cache, { data: { createTodo } }) {
  //   const { todos } = cache.readQuery({
  //     query: gql`
  //       query getListTodos($listId: ID!) {
  //         listById(listId: $listId) {
  //           id
  //           title
  //           todos {
  //             id
  //             isCompleted
  //             name
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       listId: props.listId,
  //     },
  //   });
  // },

  const checkTodo = () => {
    console.log("checked the todo item!");
    //updateTodo();
  };

  props.todos.map((elem) => {
    rows.push(
      <TodoItem
        key={elem.id.toString()}
        id={elem.id}
        deleteTodo={props.deleteTodo}
        // checkTodo={checkTodo}
        completed={elem.isCompleted}
        task={elem.name}
      />
    );
    return 0;
  });

  return (
    <div>
      {props.todos.length == 0 ? (
        <div>No Todos in this list!</div>
      ) : (
        <div>{rows}</div>
      )}
    </div>
  );
}

export default Todos;
