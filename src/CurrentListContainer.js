import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LIST_TODOS } from "./queries";
import Todos from "./Todos";
import { NEW_TODO, ALL_TODOS, DELETE_TODO_ITEM } from "./queries";

function CurrentListContainer(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(LIST_TODOS, {
    variables: { listId: props.listId },
  });

  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODOS });
      const thingThree = cache.readQuery({
        query: LIST_TODOS,
        variables: { listId: props.listId },
      });
      let updatedTodos = todos.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });

      let updatedListTodos = thingThree.listById.todos.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });

      let newListById = {
        ...thingThree.listById,
      };
      newListById.todos = updatedListTodos;

      console.log("thingThree in deletion:");
      console.log(newListById);

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: updatedTodos,
        },
      });
      cache.writeQuery({
        query: LIST_TODOS,
        variables: { listId: props.listId },
        data: {
          listById: newListById,
        },
      });
    },
  });

  const [createTodo] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      const thingOne = cache.readQuery({ query: ALL_TODOS });
      const thingThree = cache.readQuery({
        query: LIST_TODOS,
        variables: { listId: props.listId },
      });

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [createTodo, ...thingOne.todos],
        },
      });
      cache.writeQuery({
        query: LIST_TODOS,
        variables: { listId: props.listId },
        data: {
          listById: [createTodo, ...thingThree.listById.todos],
        },
      });
    },
  });

  const onDeleteTodo = (todoId) => {
    deleteTodo({
      variables: { todo: todoId },
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    createTodo({
      variables: { listId: props.listId, newTodo: taskField },
    });
    setTaskField("");
  };
  const handleChange = (event) => {
    setTaskField(event.target.value);
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
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Add a Todo"
            value={taskField}
            onChange={handleChange}
            name="name"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
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
