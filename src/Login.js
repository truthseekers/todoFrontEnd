import React, { useState, useContext } from "react";
import NavTodo from "./NavTodo";
import { AUTH_TOKEN } from "./constants";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "./queries";
import { AuthContext } from "./AuthContext";

function Login(props) {
  const [state, setState] = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [doLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      setState((state) => ({
        ...state,
        userName: data.login.user.name,
        userId: data.login.user.id,
        isLoggedIn: true,
      }));
      localStorage.setItem("userName", data.login.user.name);
      localStorage.setItem("userId", data.login.user.id);

      _confirm(data);
    },
    onError(data) {
      setErrors(data.graphQLErrors);
    },
  });

  const [doSignup] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      localStorage.setItem("userName", data.signup.user.name);
      localStorage.setItem("userId", data.signup.user.id);
      setState((state) => ({
        ...state,
        userName: data.signup.user.name,
        userId: data.signup.user.id,
        isLoggedIn: true,
      }));
      _confirm(data);
    },
    onError(data) {
      setErrors([
        {
          message:
            "Email may already be in use. Something went wrong. Please try again",
        },
      ]);
    },
  });

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    props.history.push(`/`);
  };

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  // }

  const handleLogin = () => {
    if (login) {
      doLogin({ variables: { email, password, name: userName } });
    } else {
      doSignup({ variables: { email, password, name: userName } });
    }
  };

  // const setUserName = (e) => {
  //   console.log("still setting username!");
  //   e.preventDefault();
  //   setUserName(e.target.value);
  // }

  let errorsList = [];
  if (errors) {
    errorsList = errors.map((error) => <li>{error.message}</li>);
  }

  return (
    <div>
      <NavTodo userName={props.userName} />
      <h3 style={{ color: "orange" }}>
        Note: This is a demo app on a DEMO server. Please use fake
        email/passwords. Example - "hello@123.com" and "pass"
      </h3>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div style={{ marginBottom: "20px" }} className="flex flex-column">
        {!login && (
          <div>
            <input
              style={{ margin: "10px" }}
              value={login.userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </div>
        )}
        <input
          style={{ margin: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="a fake email address"
        />
        <input
          style={{ margin: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="fake password"
        />
      </div>
      <div className="flex mt3">
        <span
          style={{ margin: "20px" }}
          className="pointer mr2 button"
          onClick={handleLogin}
        >
          <button>{login ? "login" : "Sign Up!"}</button>
        </span>
        <span className="pointer button" onClick={() => setLogin(!login)}>
          <button>
            {login ? "Create an account?" : "already have an account?"}
          </button>
        </span>
      </div>
      {errorsList.length > 0 && <span>error list: {errorsList}</span>}
    </div>
  );
}

export default Login;
