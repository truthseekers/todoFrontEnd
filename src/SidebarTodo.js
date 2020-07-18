import React from "react";
import Nav from "react-bootstrap/Nav";
import ListForm from "./ListForm";
import Lists from "./Lists";

function SidebarTodo(props) {
  return (
    <Nav
      id="sidebarMenu"
      className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div style={{ background: "#eee" }} class="sidebar-sticky pt-3">
        <ListForm onAddList={props.addList} />
        <Lists
          onChangeList={props.selectList}
          onDeleteList={props.deleteList}
          listsState={props.listsState}
          currentListId={props.listsState.currentListId}
        />
      </div>
    </Nav>
  );
}

export default SidebarTodo;
