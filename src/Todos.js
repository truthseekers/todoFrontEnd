import React from "react";
import TodoItem from "./TodoItem";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader";

const LIST_TODOS = gql`
  query getListTodos($listId: ID!) {
    listById(listId: $listId) {
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

  const { data, loading, error } = useQuery(LIST_TODOS, {
    variables: { listId: props.listId },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  data.listById.todos.map((elem) => {
    rows.push(
      <TodoItem
        key={elem.id.toString()}
        id={elem.id}
        deleteTodo={props.deleteTodo}
        checkTodo={props.checkTodo}
        completed={elem.isCompleted}
        task={elem.name}
      />
    );
    return 0;
  });

  return (
    <div>
      <h3>Todo Items For: {data.listById.title}</h3>
      {rows}
    </div>
  );
}

export default Todos;
