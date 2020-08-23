import React, { useState } from "react";
import AppContainer from "../AppContainer";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { AUTH_TOKEN } from "../constants";
import { ME, ALL_LISTS } from "../queries";
import { useQuery } from "react-apollo";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const meQuery = useQuery(ME);
  const listsQuery = useQuery(ALL_LISTS);

  let defaultLoggedInUser;
  if (authToken && meQuery.data) {
    defaultLoggedInUser = {
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
      email: "jajaja@ya.com",
    };
  }

  const [loggedInUser, setLoggedInUser] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    email: "jaja@ya.com",
  });

  const [currentListId, setCurrentListId] = useState("");

  const updateLoggedInUser = (arg) => {
    setLoggedInUser(arg);
  };

  if (meQuery.loading || listsQuery.loading) {
    return <div>Loading...</div>;
  }

  if (!currentListId && listsQuery.data.lists.length > 0) {
    setCurrentListId(listsQuery.data.lists[0].id);
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
