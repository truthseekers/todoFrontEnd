import React from "react";
import TodoItem from "./TodoItem";

function Todos(props) {
  let incompleteRows = [];
  let completedTodos = [];

  props.todos.map((elem) => {
    if (elem.isCompleted) {
      completedTodos.push(
        <TodoItem
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
          key={elem.id.toString()}
          id={elem.id}
          deleteTodo={props.deleteTodo}
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
      {props.todos.length === 0 ? (
        <div>No Todos in this list!</div>
      ) : (
        <div>{incompleteRows}</div>
      )}
      <h3 style={{ marginTop: "30px" }}>Completed Todos: </h3>
      <span style={{ textDecoration: "line-through" }}>{completedTodos}</span>
    </div>
  );
}

export default Todos;
