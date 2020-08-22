import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import Lists from "./Lists";
import { ALL_LISTS, NEW_LIST } from "./queries";
import { AUTH_TOKEN } from "./constants";

function SidebarTodo(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(ALL_LISTS);
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
      props.selectList(newList.id);
    },
  });

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createList({
      variables: { title: taskField, userId: props.userData.me.id },
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
        loggedInUser={props.loggedInUser}
        onDeleteList={props.deleteList}
        selectList={props.selectList}
        lists={data.lists}
        postedBy={data.postedBy}
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
        {authToken ? (
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
        ) : (
          <div style={{ fontWeight: "bold", color: "#28a745" }}>
            Log in / Sign up to create a todo list!
          </div>
        )}
        {renderLists}
      </div>
    </Nav>
  );
}

export default SidebarTodo;
