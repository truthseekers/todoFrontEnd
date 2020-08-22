import React, { useState } from "react";
import AppContainer from "../AppContainer";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { AUTH_TOKEN } from "../constants";
import { ME, ALL_LISTS, DELETE_LIST } from "../queries";
import { useQuery, useMutation } from "react-apollo";
import Lists from "../Lists";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const meQuery = useQuery(ME);
  const listsQuery = useQuery(ALL_LISTS);

  let defaultLoggedInUser;
  if (authToken && meQuery.data) {
    defaultLoggedInUser = {
      id: localStorage.getItem("userId"),
      name: localStorage.getItem("userName"),
      email: "jajaja@ya.com",
    };
  }

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

  if (authToken) {
  } else {
  }

  const updateLoggedInUser = (arg) => {
    setLoggedInUser(arg);
  };

  if (meQuery.loading || listsQuery.loading) {
    return <div>Loading...</div>;
  }

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  if (!currentListId && listsQuery.data.lists.length > 0) {
    setCurrentListId(listsQuery.data.lists[0].id);
  }

  let renderLists;
  if (listsQuery.data.lists.length > 0) {
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
