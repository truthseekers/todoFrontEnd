import React from "react";
import Nav from "react-bootstrap/Nav";
import ListForm from "./components/ListForm";
import ListsContainer from "./components/ListsContainer";
function SidebarTodo(props) {
  return (
    <Nav
      id="sidebarMenu"
      className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div style={{ background: "#eee" }} className="sidebar-sticky pt-3">
        <ListForm />
        <ListsContainer />
      </div>
    </Nav>
  );
}

export default SidebarTodo;
