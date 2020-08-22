import React, { useState, useContext } from "react";
/// This is a hack because I can't figure out how to get the meQuery to actually UPDATE despite the fact that I've changed
// the login state. I trhink figuring out UseContext will help, but no idea..

import { AUTH_TOKEN } from "./constants";
import { ME } from "./queries";
import { useQuery } from "react-apollo";

function MeQueryHack(props) {
  const meQuery = useQuery(ME);

  if (meQuery.loading) {
    return <div>Loading...</div>;
  }

  //   if (meQuery.data) {
  //     // setLoggedInUser(true);
  //   } else {
  //   }

  return <div></div>;
}

export default MeQueryHack;
