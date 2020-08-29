import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DELETE_LIST, ALL_LISTS } from "../queries";
import Lists from "../Lists";
import { AuthContext } from "../AuthContext";

function ListsContainer(props) {
  const [state, setState] = useContext(AuthContext);

  const { data, loading, error } = useQuery(ALL_LISTS);

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });
      if (updatedLists.length !== 0) {
        // console.log("lists.length");
        // console.log(data.lists.length);
        setState((state) => ({ ...state, currentListId: updatedLists[0].id }));
      } else {
        // console.log("ELSE lists.length");
        // console.log(data.lists.length);
        setState((state) => ({ ...state, currentListId: "" }));
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!state.currentListId && data.lists.length > 0) {
    console.log("setting listsState or something. lists length:");
    console.log(data.lists.length);
    setState((state) => ({
      ...state,
      currentListId: data.lists[0].id,
    }));
  }
  console.log("lists.length");
  console.log(data.lists.length);

  if (error) {
    return <div>Error</div>;
  }

  let renderLists;
  if (data.lists.length > 0) {
    renderLists = (
      <div>
        <Lists
          onDeleteList={onDeleteList}
          lists={data.lists}
          postedBy={data.postedBy}
        />
      </div>
    );
  } else {
    renderLists = <p>You have no lists! Create some!</p>;
  }

  return <div>{renderLists}</div>;
}

export default ListsContainer;
