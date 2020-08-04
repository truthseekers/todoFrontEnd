import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTodo from "./NavTodo";
import SidebarTodo from "./SidebarTodo";
import { useQuery } from "@apollo/react-hooks";
import CurrentListContainer from "./CurrentListContainer";
import { GET_LIST_IDS } from "./queries";

let defaultListsState = {
  currentListId: 58,
};

function App() {
  const { data, loading, error } = useQuery(GET_LIST_IDS);

  // const [listsState, setListsState] = useState(defaultListsState);
  const [listsState, setListsState] = useState("");

  const [todosState, setTodosState] = useState([]);

  // useEffect(() => {
  // setListsState()
  // console.log("in useEffect");
  // setListsState(data.lists[0].id);
  // });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  // setListsState(data.lists[0].id);

  if (!listsState) {
    console.log("setting listsState: ");
    console.log(data.lists[0].id);
    setListsState({ currentListId: data.lists[0].id });
  } else {
    console.log("Fuck me");
  }

  const selectList = (newListId) => {
    let newState = {
      ...listsState,
      currentListId: newListId,
    };
    setListsState(newState);
  };

  const checkTodo = (updatedItem) => {
    let newState = todosState.map((elem) => {
      if (updatedItem === elem.id) {
        return { ...elem, completed: !elem.completed };
      } else {
        return elem;
      }
    });
    setTodosState(newState);
  };

  // if (data && !listsState) {
  //   console.log("Data faucking exists");
  //   setListsState(data.lists[0].id);
  // } else {
  //   console.log("NO DATA. piee of shit");
  // }
  // console.log("list IDS");
  // console.log(data.lists[0].id);
  // console.log("UGH!@");

  return (
    <div>
      <NavTodo />
      <Container fluid>
        <Row>
          <SidebarTodo
            selectList={selectList}
            listsState={listsState}
            currentListId={listsState.currentListId}
          />

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <CurrentListContainer listId={listsState.currentListId} />
              </Col>
            </Row>
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default App;
