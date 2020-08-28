import React, { useState, useContext } from "react";
import { NEW_LIST, ALL_LISTS } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { AUTH_TOKEN } from "../constants";
import { AuthContext } from "../AuthContext";

function ListForm(props) {
  const [state, setState] = useContext(AuthContext);
  const [taskField, setTaskField] = useState("");
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [createList] = useMutation(NEW_LIST, {
    update(cache, { data: { newList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: [newList, ...lists],
        },
      });

      setState((state) => ({ ...state, currentListId: newList.id }));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createList({
      variables: {
        title: taskField,
        userId: state.userId,
      },
    });
  };

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  return (
    <div>
      {authToken ? (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Create a new List"
              type="text"
              value={taskField}
              onChange={handleChange}
              name="name"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div style={{ fontWeight: "bold", color: "#28a745" }}>
          Log in / Sign up to create a todo list!
        </div>
      )}
    </div>
  );
}

export default ListForm;
