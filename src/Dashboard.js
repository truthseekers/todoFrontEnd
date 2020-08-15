import React from "react";
import { AUTH_TOKEN } from "./constants";
import { createContext } from "react";

function Dashboard(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (authToken) {
    //console.log("someone is logged in!");
  } else {
    //console.log("Nobody logged in yo!");
  }

  return (
    <div>
      <nav>I am the dashboard</nav>
      {/* <div>
      <Route path="/dashboard" component={Dashboard} />
    </div> */}
    </div>
  );
}

export default Dashboard;
