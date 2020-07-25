import React from "react";
import TodoItem from "./TodoItem";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";

// const LIST_TODOS = gql`
//   query getList($list: ID!) {
//     listById(listId: $list) {
//       id
//       title
//       todos {
//         id
//         isCompleted
//         name
//       }
//     }
//   }
// `;

const LIST_TODOS = gql`
  query {
    listById(listId: 1) {
      id
      title
      todos {
        id
        isCompleted
        name
      }
    }
  }
`;

function Todos(props) {
  let rows = [];

  console.log("props in todo ya");
  console.log(props);
  const { data, loading, error } = useQuery(LIST_TODOS);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  console.log("YOUR ITEMS HERE!!");
  console.log(data.listById.todos);

  data.listById.todos.map((elem) => {
    rows.push(
      <TodoItem
        id={elem.id}
        deleteTodo={props.deleteTodo}
        checkTodo={props.checkTodo}
        completed={elem.isCompleted}
        task={elem.name}
      />
    );
  });

  //   props.todos.map((elem) => {
  //     if (elem.listId === props.listId) {
  //       rows.push(
  //         <TodoItem
  //           id={elem.id} // unique
  //           deleteTodo={props.deleteTodo} // same thing every time.
  //           checkTodo={props.checkTodo} // same thing every time.
  //           completed={elem.completed} // unique
  //           task={elem.task} // unique
  //         />
  //       );
  //     }
  //     return 0;
  //   });

  //   props.todos.map((elem) => {
  //     if (elem.listId === props.listId) {
  //       rows.push(
  //         <TodoItem
  //           id={elem.id} // unique
  //           deleteTodo={props.deleteTodo} // same thing every time.
  //           checkTodo={props.checkTodo} // same thing every time.
  //           completed={elem.completed} // unique
  //           task={elem.task} // unique
  //         />
  //       );
  //     }
  //     return 0;
  //   });

  return <div>{rows}</div>;
}

export default Todos;
