import React from "react";
import TodoItem from "./TodoItem";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "./queries";

function Todos(props) {
  let incompleteRows = [];
  let completedTodos = [];
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
    //console.log("checked the todo item!");
    //updateTodo();
  };

  props.todos.map((elem) => {
    //console.log("elem...: ");
    //console.log(elem.postedBy.name);
    if (elem.isCompleted) {
      //console.log("elem.postedBy:");
      //console.log(elem.postedBy);
      completedTodos.push(
        <TodoItem
          loggedInUser={props.loggedInUser}
          key={elem.id.toString()}
          id={elem.id}
          deleteTodo={props.deleteTodo}
          completed={elem.isCompleted}
          task={elem.name}
          postedBy={elem.postedBy}
        />
      );
    } else {
      incompleteRows.push(
        <TodoItem
          loggedInUser={props.loggedInUser}
          key={elem.id.toString()}
          id={elem.id}
          deleteTodo={props.deleteTodo}
          // checkTodo={checkTodo}
          completed={elem.isCompleted}
          postedBy={elem.postedBy}
          task={elem.name}
        />
      );
    }
    return 0;
  });

  return (
    <div>
      {props.todos.length == 0 ? (
        <div>No Todos in this list!</div>
      ) : (
        <div>{incompleteRows}</div>
      )}
      <h3>Completed Todos: </h3>
      <span style={{ textDecoration: "line-through" }}>{completedTodos}</span>
    </div>
  );
}

export default Todos;
