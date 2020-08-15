/// THiS FILE DOEs NOTHING. Don't think I need it.

import React, { useState } from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";
import ListRow from "./ListRow";
import TestLists from "./TestLists";

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

const LISTS_SIDEBAR = gql`
  query allListsSidebar {
    lists {
      title
      id
    }
  }
`;

const listRows = [];

function ListForm(props) {
  const [taskField, setTaskField] = useState("");

  const [createList, newListMutation] = useMutation(NEW_LIST, {
    update(cache, { data: { newList } }) {
      // const { lists } = cache.readQuery({ query: ALL_LISTS });
      const thingOne = cache.readQuery({ query: ALL_LISTS });
      const thingTwo = cache.readQuery({ query: LISTS_SIDEBAR });

      cache.writeQuery({
        query: LISTS_SIDEBAR,
        data: {
          lists: [newList, ...thingTwo.lists],
        },
      });

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: [newList, ...thingOne.lists],
        },
      });
    },
  });
  const { data, loading, error } = useQuery(ALL_LISTS);
  const sidebarObj = useQuery(LISTS_SIDEBAR);

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createList({
      variables: { newList: taskField, userId: 3 },
    });
  };

  if (loading || newListMutation.loading || sidebarObj.loading2) {
    return <Loader />;
  }

  if (error || newListMutation.error || sidebarObj.error2) {
    return <p>error</p>;
  }

  data.lists.map((elem) => {
    listRows.push(
      <ListRow
        key={elem.id.toString()}
        id={elem.id}
        onDeleteList={props.deleteList}
        name={elem.title}
        onSelect={props.selectList}
      />
    );
  });

  return (
    <div>
      <h3>.</h3>
    </div>
  );
}

export default ListForm;
