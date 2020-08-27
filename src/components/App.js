import React, { useState, useContext } from "react";
import AppContainer from "../AppContainer";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { AUTH_TOKEN } from "../constants";
import { ME, ALL_LISTS } from "../queries";
import { useQuery } from "react-apollo";
import { AuthProvider } from "../AuthContext";
import { AuthContext } from "../AuthContext";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [state, setState] = useContext(AuthContext);
  const meQuery = useQuery(ME);
  const listsQuery = useQuery(ALL_LISTS);

  const [currentListId, setCurrentListId] = useState("");

  if (meQuery.loading || listsQuery.loading) {
    return <div>Loading...</div>;
  }

  if (!currentListId && listsQuery.data.lists.length > 0) {
    setCurrentListId(listsQuery.data.lists[0].id);
  }

  return (
    <div>
      <AuthProvider userData={meQuery.data}>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route
            path="/"
            render={(props) => (
              <AppContainer {...props} userData={meQuery.data} />
            )}
          />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
