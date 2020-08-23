import React from "react";
import Nav from "react-bootstrap/Nav";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader";
import Lists from "./Lists";
import { ALL_LISTS } from "./queries";
import ListForm from "./components/ListForm";

function SidebarTodo(props) {
  const { data, loading, error } = useQuery(ALL_LISTS);

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
        <ListForm userData={props.userData} />
        {renderLists}
      </div>
    </Nav>
  );
}

export default SidebarTodo;
