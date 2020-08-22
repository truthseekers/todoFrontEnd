import React from "react";
import { AUTH_TOKEN } from "./constants";

function Dashboard(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  if (authToken) {
  } else {
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
