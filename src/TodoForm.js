import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";

const NEW_TODO = gql`
  mutation createNewTodo($newTodo: String!, $listId: ID!) {
    createTodo(name: $newTodo, listId: $listId) {
      id
      name
    }
  }
`;

// const ALL_TODOS

function TodoForm(props) {
  const [taskField, setTaskField] = useState("");
  const [createTodo, newTodoMutation] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      console.log("looking at the todos cache yo");

      const { todos } = cache.readQuery({
        query: gql`
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
        `,
        variables: {
          listId: props.listId,
        },
      });

      console.log("we got the following info: ");
      console.log(todos);
      // cache.writeQuery({

      // })
    },
  });

  console.log("list id in todo Form: ");
  console.log(props.listId);

  const handleSubmit = (event) => {
    event.preventDefault();

    createTodo({
      variables: { listId: props.listId, newTodo: taskField },
    });

    props.onAddTodo({
      listId: props.listId,
      todo: taskField,
    });
  };

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  return (
    <div>
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
    </div>
  );
}

export default TodoForm;
