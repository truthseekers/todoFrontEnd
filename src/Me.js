import React, { Component } from "react";
import { AUTH_TOKEN } from "./constants";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ME } from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

function Me() {
  const { data, loading, error } = useQuery(ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>This is the me object</div>;
}

export default Me;
