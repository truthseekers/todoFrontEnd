import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LIST_TODOS } from "./queries";
import Todos from "./Todos";

function CurrentListContainer(props) {
  const { data, loading, error } = useQuery(LIST_TODOS, {
    variables: { listId: props.listId },
  });

  const onDeleteTodo = (todoId) => {
    // deleteTodo({
    //   variables: { todo: todoId },
    // });
  };

  const checkTodo = (updatedItem) => {
    // let newState = todosState.map((elem) => {
    //   if (updatedItem === elem.id) {
    //     return { ...elem, completed: !elem.completed };
    //   } else {
    //     return elem;
    //   }
    // });
    // setTodosState(newState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>CurrentListContainer here:</div>
      <Todos
        todos={data.listById.todos}
        deleteTodo={onDeleteTodo}
        checkTodo={checkTodo}
        listId={props.listId}
      />
    </div>
  );
}

export default CurrentListContainer;
