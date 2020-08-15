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
  const [loggedInUser, setLoggedInUser] = useState(authToken ? true : false);
  const meQuery = useQuery(ME);

  console.log(authToken);
  if (authToken) {
    //console.log("auth token exists on app.js");
    // console.log(authToken);
  } else {
    //console.log("no auth token in app.js");
  }

  const updateLoggedInUser = (arg) => {
    //console.log("changing logged In userstate ");
    setLoggedInUser(arg);
  };

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
