import React, { useState, useContext } from "react";
import AppContainer from "./AppContainer";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"; // they only use browserrouter
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { AUTH_TOKEN } from "./constants";
import { ME, ALL_LISTS, DELETE_LIST } from "./queries";
import { useQuery, useMutation } from "react-apollo";
import authContext from "./AuthContext";
import Lists from "./Lists";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const meQuery = useQuery(ME);
  const listsQuery = useQuery(ALL_LISTS);

  let defaultLoggedInUser = "";
  if (authToken && meQuery.data) {
    // console.log("setting loggedInUser to:::::: ");
    // console.log(meQuery.data.me);
    defaultLoggedInUser = {
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
      email: "jajaja@ya.com",
    };
    //console.log(defaultLoggedInUser);
  }

  //console.log("right before setting loggedInUser: ");
  //console.log(defaultLoggedInUser);
  const [loggedInUser, setLoggedInUser] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    email: "jaja@ya.com",
  });
  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });
      if (updatedLists.length !== 0) {
        selectList(updatedLists[0].id);
      }
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: updatedLists,
        },
      });
    },
  });
  const [currentListId, setCurrentListId] = useState("");

  const selectList = (newListId) => {
    setCurrentListId(newListId);
  };

  console.log("user localstorage info: ");
  console.log(localStorage.getItem("userName"));
  console.log(localStorage.getItem("userId"));
  console.log(localStorage.getItem(AUTH_TOKEN));
  console.log("loggedInUser: ");
  console.log(loggedInUser);
  //console.log("AFTER... ");
  //console.log(loggedInUser);

  //console.log(authToken);
  if (authToken) {
    //console.log("auth token exists on app.js");
    // console.log(authToken);
  } else {
    //console.log("no auth token in app.js");
  }

  const updateLoggedInUser = (arg) => {
    //console.log("changing logged In userstate ");
    //setMeQueryState(ME);
    setLoggedInUser(arg);
  };

  //console.log(authToken);
  //console.log("meQuery: ");
  //console.log(meQuery);
  //console.log("loggedInUser: ");
  //console.log(loggedInUser);
  //console.log("loggedInUser: ");
  //console.log(loggedInUser);

  if (meQuery.loading || listsQuery.loading) {
    return <div>Loading...</div>;
  }

  if (meQuery.data) {
    //console.log("user data is: ");
    //console.log(meQuery.data);
    // console.log(meQuery.data.me.name);
    // setLoggedInUser(true);
  } else {
    //console.log("no user data! see: ");
    //console.log(meQuery.data);
  }

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  if (!currentListId && listsQuery.data.lists.length > 0) {
    setCurrentListId(listsQuery.data.lists[0].id);
  }

  console.log("ListsQuery ya");
  console.log(listsQuery.data.lists);
  let renderLists;
  if (listsQuery.data.lists.length > 0) {
    //console.log("data.postedBy");
    //console.log(data);
    renderLists = (
      <Lists
        loggedInUser={loggedInUser}
        onDeleteList={onDeleteList}
        selectList={selectList}
        lists={listsQuery.data.lists}
        postedBy={listsQuery.data.postedBy}
      />
    );
  } else {
    renderLists = <p>You have no lists! Create some!</p>;
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
        <Route path="/signup" component={Signup} />
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
