import React, { useState } from "react";
import TodoItem from "./TodoItem";

function List(props) {
  let completeRows = [];
  let incompleteRows = [];
  // console.log("props in list ya");
  // console.log(props);

  props.todos.map((elem) => {
    if (elem.completed) {
      completeRows.push(
        <TodoItem
          handleTodo={props.handleTodo}
          completed={elem.completed}
          key={elem.id}
          id={elem.id}
          task={elem.task}
        />
      );
    } else {
      incompleteRows.push(
        <TodoItem
          handleTodo={props.handleTodo}
          completed={elem.completed}
          key={elem.id}
          id={elem.id}
          task={elem.task}
        />
      );
    }
  });

  return (
    <div>
      <h3>Incomplete Todos</h3>
      {/* {incompleteRows} */}

      <h3>Completed Todos</h3>
      <del>{/* <span>{completeRows}</span> */}</del>
    </div>
  );
}

export default List;
