import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "react-loader";

const DELETE_ITEM = gql`
  mutation deletingList($listId: ID!) {
    deleteList(listId: $listId) {
      list {
        id
      }
    }
  }
`;

function ListRow(props) {
  const [deleteList, deleteListMutation] = useMutation(DELETE_ITEM);

  const handleListChange = () => {
    props.onSelect(props.id);
  };

  const deleteRow = () => {
    deleteList({
      variables: { listId: props.id },
    });

    // props.onDeleteList(props.id);
  };

  return (
    <li className="list-row">
      <span onClick={handleListChange}>{props.name}</span> -{" "}
      <TrashFill onClick={deleteRow} />
    </li>
  );
}

export default ListRow;
