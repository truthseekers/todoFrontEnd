import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function NavTodo() {
  return (
    <Navbar className="sticky-top" bg="light" expand="md">
      <Link to="/">
        <Navbar.Brand>Super Todo List</Navbar.Brand>
      </Link>
      <Link to="/login">
        <Button variant="outline-success">Login</Button>
      </Link>
      <Link to="/signup">
        <Button variant="outline-success">Sign Up</Button>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}

export default NavTodo;
