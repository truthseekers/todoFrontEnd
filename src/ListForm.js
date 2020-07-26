import React, { useState } from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import { createSignalIfSupported } from "@apollo/client";

const NEW_LIST = gql`
  mutation addNewList($newList: String!) {
    newList(title: $newList) {
      id
      title
    }
  }
`;

function ListForm(props) {
  const [taskField, setTaskField] = useState("");

  const [createList, newListMutation] = useMutation(NEW_LIST);

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("added new list maaaaan");
    console.log(taskField);

    createList({
      variables: { newList: taskField },
    });

    // props.onAddList(taskField);
  };

  return (
    <div>
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
    </div>
  );
}

export default ListForm;
