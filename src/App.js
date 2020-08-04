import React, { useState } from "react";
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

function App() {
  const { data, loading, error } = useQuery(GET_LIST_IDS);

  const [listsState, setListsState] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [todosState, setTodosState] = useState([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  // data always exists past this point since its after loading conditional
  // If a list exists then set state to first list. Need !listsState otherwise render infinite loop
  if (!listsState && data.lists.length > 0) {
    setListsState(data.lists[0].id);
  }

  if (data.lists.length == 0 && !isListEmpty) {
    console.log("list is empty yall!");
    setIsListEmpty(true);
  } else if (data.lists.length !== 0 && isListEmpty) {
    console.log("list is NOt empty");
    setIsListEmpty(false);
  }

  // const checkEmptyList = () => {

  // }

  const selectList = (newListId) => {
    setListsState(newListId);
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

  //  console.log("at bottom of app.js. app.js state: ", listsState);

  return (
    <div>
      <NavTodo />
      <Container fluid>
        <Row>
          <SidebarTodo
            selectList={selectList}
            listsState={listsState}
            currentListId={listsState}
          />

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <CurrentListContainer
                  isListEmpty={isListEmpty}
                  listId={listsState}
                />
              </Col>
            </Row>
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default App;
