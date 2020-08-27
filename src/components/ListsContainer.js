import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_LIST_IDS, DELETE_LIST, ALL_LISTS } from "../queries";
import Lists from "../Lists";

function ListContainer(props) {
  const { data, loading, error } = useQuery(GET_LIST_IDS);

  const [currentListId, setCurrentListId] = useState("");
  const allLists = useQuery(ALL_LISTS);

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

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  const selectList = (newListId) => {
    props.selectList(newListId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  // data always exists past this point since its after loading conditional
  // If a list exists then set state to first list. Need !currentListId otherwise render infinite loop
  if (!currentListId && data.lists.length > 0) {
    setCurrentListId(data.lists[0].id);
  }

  let renderLists;
  if (data.lists.length > 0) {
    renderLists = (
      <div>
        <Lists
          onDeleteList={onDeleteList}
          selectList={selectList}
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
