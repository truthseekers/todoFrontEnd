import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"; // they only use browserrouter
import Login from "./Login";
import Signup from "./Signup";
import { AUTH_TOKEN } from "./constants";
import { ApolloProvider } from "react-apollo"; // same
import { setContext } from "apollo-link-context"; // same

import { createHttpLink } from "apollo-link-http"; // same

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloClient, InMemoryCache } from "@apollo/client"; // "apollo-client" in original. // apollo-cache-memory in original
import { WebSocketLink } from "apollo-link-ws"; // same
import { split } from "apollo-link"; // same
import { getMainDefinition } from "apollo-utilities"; // same
import { createBrowserHistory } from "history";
import AuthContext from "./AuthContext";
// let history = createdBrowserHistory();

const httpLink = createHttpLink({
  // uri: "http://localhost:4000",
  uri: "https://graphqlsupertodo.herokuapp.com/",
});

//console.log("In INDEX");

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  // console.log("in authLink?");
  // console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  // uri: `ws://localhost:4000`,
  uri: `ws://graphqlsupertodo.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  fuckoff: "jesus christ",
  cache: new InMemoryCache(),
});

const Dashboard = () => (
  <div>
    <nav>I am the dashboard</nav>
    {/* <div>
      <Route path="/dashboard" component={Dashboard} />
    </div> */}
  </div>
);

// console.log("Fudge muffins: client Object: ");
// console.log(authLink);

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
  msg: "Why are people so bad at tutorials?",
};

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      {/* <AuthContext.Provider value={themes}> */}
      <App />
      {/* <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={App} />
        </Switch> */}
      {/* </AuthContext.Provider> */}
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
