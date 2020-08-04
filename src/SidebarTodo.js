import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import Lists from "./Lists";
import { ALL_LISTS, NEW_LIST, DELETE_LIST } from "./queries";

function SidebarTodo(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(ALL_LISTS);

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS }); // all lists IN THE CACHE
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });
      if (updatedLists.length == 0) {
        props.selectList("");
      } else {
        props.selectList(updatedLists[0].id);
      }
      //props.selectList(updatedLists[0].id ? updatedLists[0].id : "");
      // // if (updatedLists[0].id) {
      // //   props.selectList(updatedLists[0].id);
      // // }
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

  let renderLists;
  if (data.lists.length > 0) {
    renderLists = (
      <Lists
        onDeleteList={onDeleteList}
        selectList={props.selectList}
        lists={data.lists}
      />
    );
  } else {
    renderLists = <p>You have no lists! Create some!</p>;
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
        {renderLists}
        {/* <Lists
          onDeleteList={onDeleteList}
          selectList={props.selectList}
          lists={data.lists}
        /> */}
      </div>
    </Nav>
  );
}

export default SidebarTodo;
