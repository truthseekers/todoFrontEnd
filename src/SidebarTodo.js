import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import Lists from "./Lists";
import { ALL_LISTS, NEW_LIST, DELETE_LIST } from "./queries";

function SidebarTodo(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(ALL_LISTS);

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });

      console.log("process of deleting List: deleteList is...");
      console.log(deleteList.list.id);
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: updatedLists,
        },
      });
    },
  });

  const [createList] = useMutation(NEW_LIST, {
    update(cache, { data: { newList } }) {
      const thingOne = cache.readQuery({ query: ALL_LISTS });

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: [newList, ...thingOne.lists],
        },
      });
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createList({
      variables: { newList: taskField },
    });
  };

  const onDeleteList = (listId) => {
    console.log("deleting list from sidebarTodo: " + listId);

    deleteList({
      variables: { listId: listId },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Nav
      id="sidebarMenu"
      className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div style={{ background: "#eee" }} className="sidebar-sticky pt-3">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Create a new wow List"
              type="text"
              value={taskField}
              onChange={handleChange}
              name="name"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Lists
          onDeleteList={onDeleteList}
          selectList={props.selectList}
          lists={data.lists}
        />
      </div>
    </Nav>
  );
}

export default SidebarTodo;
