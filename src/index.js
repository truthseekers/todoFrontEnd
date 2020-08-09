import React from "react";
// import { render } from "react-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { Router, Link } from "@reach/router";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";

import { ApolloProvider } from "react-apollo";
//import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
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

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={App} />
      </Switch>
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
