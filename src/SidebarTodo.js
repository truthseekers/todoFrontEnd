import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import Lists from "./Lists";
import { ALL_LISTS, NEW_LIST, DELETE_LIST } from "./queries";
import { AUTH_TOKEN } from "./constants";

function SidebarTodo(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(ALL_LISTS);
  const authToken = localStorage.getItem(AUTH_TOKEN);

  // const [deleteList] = useMutation(DELETE_LIST, {
  //   update(cache, { data: { deleteList } }) {
  //     const { lists } = cache.readQuery({ query: ALL_LISTS });
  //     let updatedLists = lists.filter((elem) => {
  //       if (elem.id !== deleteList.list.id) {
  //         return elem;
  //       }
  //     });
  //     if (updatedLists.length !== 0) {
  //       props.selectList(updatedLists[0].id);
  //     }
  //     cache.writeQuery({
  //       query: ALL_LISTS,
  //       data: {
  //         lists: updatedLists,
  //       },
  //     });
  //   },
  // });

  //console.log("props in sidebarTodo: ");
  //console.log(props.userData.me.id);

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
    //console.log("creating newLilst now!");
    createList({
      variables: { title: taskField, userId: props.userData.me.id },
    });
  };

  // const onDeleteList = (listId) => {
  //   deleteList({
  //     variables: { listId: listId },
  //   });
  // };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  let renderLists;
  if (data.lists.length > 0) {
    //console.log("data.postedBy");
    //console.log(data);
    renderLists = (
      <Lists
        loggedInUser={props.loggedInUser}
        deleteList={props.deleteList}
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
          <div>Log in / Sign up to create a todo list!</div>
        )}
        {renderLists}
      </div>
    </Nav>
  );
}

export default SidebarTodo;
