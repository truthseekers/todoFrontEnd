import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_LIST_IDS, DELETE_LIST, ALL_LISTS } from "../queries";
import Lists from "../Lists";
import { AuthContext } from "../AuthContext";

function ListContainer(props) {
  const { data, loading, error } = useQuery(GET_LIST_IDS);
  const [state, setState] = useContext(AuthContext);

  const allLists = useQuery(ALL_LISTS);

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      //console.log("deleteList called in listsContainer.js");
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });
      if (updatedLists.length !== 0) {
        //console.log(
        //  "selecting a list after deletion SHUTTED IT OFF listcontainer"
        //);
        setState((state) => ({ ...state, currentListId: updatedLists[0].id }));
      }
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: updatedLists,
        },
      });
    },
  });

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  if (loading || allLists.loading) {
    return <div>Loading...</div>;
  }
  if (!state.currentListId && data.lists.length > 0) {
    //console.log("setting state in listsContainer");
    // setState((state) => ({
    //   ...state,
    //   currentListId: allLists.data.lists[0].id,
    // }));
  }

  if (error) {
    // console.log("error");
    // console.log(error);
    return <div>Error</div>;
  }

  //console.log("done loading?");
  //console.log(allLists);

  let renderLists;
  if (data.lists.length > 0) {
    renderLists = (
      <div>
        <Lists
          onDeleteList={onDeleteList}
          lists={allLists.data.lists}
          postedBy={allLists.postedBy}
        />
      </div>
    );
  } else {
    renderLists = <p>You have no lists! Create some!</p>;
  }

  return <div>{renderLists}</div>;
}

export default ListContainer;
