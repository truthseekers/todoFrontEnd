import React, { useState } from "react";
import "./dashboard.css";
import "./App.css";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTodo from "./NavTodo";
import SidebarTodo from "./SidebarTodo";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LIST_TODOS } from "./queries";
import { NEW_TODO, ALL_LISTS, ALL_TODOS, DELETE_TODO_ITEM } from "./queries";
import CurrentListContainer from "./CurrentListContainer";

let defaultListsState = {
  currentListId: 58,
};

function App() {
  const { data, loading, error } = useQuery(ALL_TODOS);
  const [listsState, setListsState] = useState(defaultListsState);
  const [todosState, setTodosState] = useState([]);
  const [taskField, setTaskField] = useState("");

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

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>error</p>;
  }

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
