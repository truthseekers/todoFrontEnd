import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";
import { withRouter } from "react-router";

function NavTodo(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const updateLoggedInStatus = () => {
    props.setLoggedInUser(false);
  };

  // let renderLists;
  // if (data.lists.length > 0) {
  //   renderLists = (
  //     <Lists
  //       loggedInUser={props.loggedInUser}
  //       onDeleteList={onDeleteList}
  //       selectList={props.selectList}
  //       lists={data.lists}
  //       postedBy={data.postedBy}
  //     />
  //   );
  // } else {
  //   renderLists = <p>You have no lists! Create some!</p>;
  // }

  return (
    <Navbar className="sticky-top" bg="light" expand="md">
      <Link to="/">
        <Navbar style={{ fontWeight: "bold", color: "black" }}>
          Super Todo List
        </Navbar>
      </Link>
      {authToken ? (
        <div
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN);
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            // props.setLoggedInUser(false);
            props.history.push(`/`);
            updateLoggedInStatus();
          }}
        >
          <Button variant="outline-success">Logout</Button>
        </div>
      ) : (
        <Link to="/login">
          <Button variant="outline-success">Login/Signup</Button>
        </Link>
      )}
      {props.loggedInUser.name && (
        <span style={{ marginLeft: "20px" }}>
          Welcome {props.loggedInUser.name}
        </span>
      )}
    </Navbar>
  );
}

export default withRouter(NavTodo);
