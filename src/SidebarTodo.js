import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import ListForm from "./ListForm";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import ListRow from "./ListRow";
import TestLists from "./TestLists";

const LISTS = gql`
  query allListsSidebar2 {
    lists {
      title
      id
    }
  }
`;

const DELETE_LIST = gql`
  mutation deletingList($listId: ID!) {
    deleteList(listId: $listId) {
      list {
        id
      }
    }
  }
`;

const NEW_LIST = gql`
  mutation addNewList($newList: String!) {
    newList(title: $newList) {
      id
      title
    }
  }
`;

const ALL_LISTS = gql`
  query allLists {
    lists {
      title
      id
    }
  }
`;

function SidebarTodo(props) {
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(LISTS);

  const [deleteList, deleteListMutation2] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });

      console.log("process of deleting List: deleteList is...");
      console.log(deleteList.list.id);
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: updatedLists,
        },
      });
    },
  });

  const [createList, newListMutation] = useMutation(NEW_LIST, {
    update(cache, { data: { newList } }) {
      // const { lists } = cache.readQuery({ query: ALL_LISTS });
      const thingOne = cache.readQuery({ query: ALL_LISTS });

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: [newList, ...thingOne.lists],
        },
      });
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createList({
      variables: { newList: taskField },
    });
  };

  const onDeleteList = (listId) => {
    console.log("deleting list from sidebarTodo: " + listId);

    deleteList({
      variables: { listId: listId },
    });
  };

  const getListName = () => {
    let result = data.lists.find(
      (element) => element.id == props.currentListId
    );
    return result.title;
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Nav
      id="sidebarMenu"
      className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div style={{ background: "#eee" }} className="sidebar-sticky pt-3">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Create a new wow List"
              type="text"
              value={taskField}
              onChange={handleChange}
              name="name"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <TestLists
          onDeleteList={onDeleteList}
          selectList={props.selectList}
          lists={data.lists}
        />
      </div>
    </Nav>
  );
}

export default SidebarTodo;
