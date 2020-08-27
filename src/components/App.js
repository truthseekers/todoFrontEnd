import React from "react";
import AppContainer from "../AppContainer";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import { ME, ALL_LISTS } from "../queries";
import { useQuery } from "react-apollo";
import { AuthProvider } from "../AuthContext";

function App() {
  const meQuery = useQuery(ME);
  const listsQuery = useQuery(ALL_LISTS); // can't delete this for some reason without error

  if (meQuery.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AuthProvider userData={meQuery.data}>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/" render={(props) => <AppContainer {...props} />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
