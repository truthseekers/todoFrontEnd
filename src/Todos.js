import React from "react";
import TodoItem from "./TodoItem";

function Todos(props) {
  let rows = [];

  props.todos.map((elem) => {
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
      {props.todos.length == 0 ? (
        <div>No Todos in this list!</div>
      ) : (
        <div>{rows}</div>
      )}
    </div>
  );
}

export default Todos;
