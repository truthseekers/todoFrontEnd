import React from "react";
import Nav from "react-bootstrap/Nav";
import ListForm from "./ListForm";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader";
import ListRow from "./ListRow";

const LISTS = gql`
  query allListsSidebar2 {
    lists {
      title
      id
    }
  }
`;

const listRows = [];

function SidebarTodo(props) {
  const { data, loading, error } = useQuery(LISTS);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error</p>;
  }

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

  data.lists.map((elem) => {
    listRows.push(
      <ListRow
        id={elem.id}
        onDeleteList={props.deleteList}
        name={elem.title}
        onSelect={props.selectList}
      />
    );
  });

  return (
    <Nav
      id="sidebarMenu"
      className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div style={{ background: "#eee" }} className="sidebar-sticky pt-3">
        <ListForm onAddList={props.addList} />
        <h3>Current List: {getListName()}</h3>
        {/* {listRows} */}
      </div>
    </Nav>
  );
}

export default SidebarTodo;
