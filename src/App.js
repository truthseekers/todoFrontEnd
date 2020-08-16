import React, { useState, useContext } from "react";
import AppContainer from "./AppContainer";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"; // they only use browserrouter
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { AUTH_TOKEN } from "./constants";
import { ME } from "./queries";
import { useQuery } from "react-apollo";
import authContext from "./AuthContext";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  // const [loggedInUser, setLoggedInUser] = useState(authToken ? true : false);
  // const [meQueryState, setMeQueryState] = useState(ME);
  const meQuery = useQuery(ME);

  let defaultLoggedInUser = "";
  if (authToken && meQuery.data) {
    // console.log("setting loggedInUser to:::::: ");
    // console.log(meQuery.data.me);
    defaultLoggedInUser = {
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
      email: "jajaja@ya.com",
    };
    //console.log(defaultLoggedInUser);
  }

  //console.log("right before setting loggedInUser: ");
  //console.log(defaultLoggedInUser);
  const [loggedInUser, setLoggedInUser] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    email: "jaja@ya.com",
  });

  console.log("user localstorage info: ");
  console.log(localStorage.getItem("userName"));
  console.log(localStorage.getItem("userId"));
  console.log(localStorage.getItem(AUTH_TOKEN));
  console.log("loggedInUser: ");
  console.log(loggedInUser);
  //console.log("AFTER... ");
  //console.log(loggedInUser);

  //console.log(authToken);
  if (authToken) {
    //console.log("auth token exists on app.js");
    // console.log(authToken);
  } else {
    //console.log("no auth token in app.js");
  }

  const updateLoggedInUser = (arg) => {
    //console.log("changing logged In userstate ");
    //setMeQueryState(ME);
    setLoggedInUser(arg);
  };

  //console.log(authToken);
  //console.log("meQuery: ");
  //console.log(meQuery);
  //console.log("loggedInUser: ");
  //console.log(loggedInUser);
  //console.log("loggedInUser: ");
  //console.log(loggedInUser);

  if (meQuery.loading) {
    return <div>Loading...</div>;
  }

  if (meQuery.data) {
    //console.log("user data is: ");
    //console.log(meQuery.data);
    // console.log(meQuery.data.me.name);
    // setLoggedInUser(true);
  } else {
    //console.log("no user data! see: ");
    //console.log(meQuery.data);
  }

  return (
    <div>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              loggedInUser={loggedInUser}
              setLoggedInUser={updateLoggedInUser}
            />
          )}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/"
          render={(props) => (
            <AppContainer
              {...props}
              userData={meQuery.data}
              loggedInUser={loggedInUser}
              setLoggedInUser={updateLoggedInUser}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
