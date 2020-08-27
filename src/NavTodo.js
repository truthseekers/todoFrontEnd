import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthContext";

function NavTodo(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [state, setState] = useContext(AuthContext);

  const updateLoggedInStatus = () => {
    console.log("called the logout. setting context state to logged out");
    setState((state) => ({ ...state, isLoggedIn: false, userId: "" }));
  };

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
      {state.isLoggedIn && (
        <span style={{ marginLeft: "20px" }}>Welcome {state.userName}</span>
      )}
    </Navbar>
  );
}

export default withRouter(NavTodo);
