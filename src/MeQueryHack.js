import React, { useState, useContext } from "react";
/// This is a hack because I can't figure out how to get the meQuery to actually UPDATE despite the fact that I've changed
// the login state. I trhink figuring out UseContext will help, but no idea..

import { AUTH_TOKEN } from "./constants";
import { ME } from "./queries";
import { useQuery } from "react-apollo";

function MeQueryHack(props) {
  const meQuery = useQuery(ME);

  //   console.log("MEQUERY HACK");
  console.log("meQuery before loading: ");
  console.log(meQuery.data);
  if (meQuery.loading) {
    return <div>Loading...</div>;
  }

  console.log("meQuery data AFTEr loading:");
  console.log(meQuery.data);

  //   if (meQuery.data) {
  //     // console.log("IN THE HACKKKK ", props.loggedInUser);
  //     // console.log(meQuery.data);
  //     // console.log(meQuery.data.me.name);
  //     // setLoggedInUser(true);
  //   } else {
  //     // console.log("no user data! see: ");
  //     // console.log(meQuery.data);
  //   }

  return <div></div>;
}

export default MeQueryHack;
