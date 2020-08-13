import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";
import { withRouter } from "react-router";

function NavTodo(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const updateLoggedInStatus = () => {
    console.log("updated logged in status...");
    props.setLoggedInUser(false);
  };

  return (
    <Navbar className="sticky-top" bg="light" expand="md">
      <Link to="/">
        <Navbar.Brand>Super Todo List</Navbar.Brand>
      </Link>
      {authToken ? (
        <div
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN);
            // props.setLoggedInUser(false);
            updateLoggedInStatus();
            props.history.push(`/`);
          }}
        >
          <Button variant="outline-success">Logout</Button>
        </div>
      ) : (
        <Link to="/login">
          <Button variant="outline-success">Login</Button>
        </Link>
      )}
      <Link to="/signup">
        <Button variant="outline-success">Sign Up</Button>
      </Link>
      <Link to="/dashboard">
        <Button variant="outline-success">Dashboard</Button>
      </Link>
      <span>Welcome {props.userName}</span>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}

export default withRouter(NavTodo);
