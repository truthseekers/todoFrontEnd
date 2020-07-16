import React, { useState } from "react";
import "./dashboard.css";
import "./App.css";
import List from "./List";
import Lists from "./Lists";
import ListForm from "./ListForm";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Query } from "react-apollo";
import gql from "graphql-tag";

// import { gql } from "apollo-boost";

const FEED_QUERY = gql`
  {
    todos {
      id
      listId
      name
    }
  }
`;

// client
//   .query({
//     query: gql`
//       {
//         todos {
//           id
//           listId
//           name
//         }
//       }
//     `,
//   })
//   .then((response) => console.log(response.data.feed));

// export default gql`
//   query GetAllTodos {
//     todos {
//       id
//       listId
//       name
//     }
//   }
// `;

console.log("HEEEY");

let defaultListsState = {
  lists: [
    { id: 0, name: "shopping" },
    { id: 1, name: "misc" },
    { id: 2, name: "travel" },
    { id: 3, name: "business" },
  ],
  currentListId: 0,
};

let defaultTodosState = [
  { id: 0, listId: 0, completed: false, task: "Salad" },
  { id: 1, listId: 0, completed: false, task: "$6000 of Toilet Paper" },
  { id: 2, listId: 0, completed: true, task: "Dog treats" },
  { id: 3, listId: 1, completed: false, task: "Trim bushes" },
  { id: 5, listId: 1, completed: false, task: "Buy plane ticket" },
  { id: 4, listId: 2, completed: false, task: "Put on my socks" },
  { id: 6, listId: 3, completed: true, task: "Call accountant" },
  { id: 7, listId: 3, completed: false, task: "Fire Bob" },
];

function getValidId(lists) {
  //console.log("in getid");
  let maxId = lists.length;
  lists.forEach((elem) => {
    if (elem.id >= maxId) {
      maxId = elem.id + 1;
    }
  });
  //console.log("new id is: " + maxId);
  //console.log(lists);
  return maxId;
}

function App() {
  const [listsState, setListsState] = useState(defaultListsState);
  const [todosState, setTodosState] = useState(defaultTodosState);
  let currentTodos;

  const addList = (elem) => {
    //console.log("from App. elem: ");
    //console.log(elem);
    let newListsState = { ...listsState };

    getValidId(listsState.lists);

    newListsState.lists[newListsState.lists.length] = {
      id: getValidId(listsState.lists),
      name: elem,
      todos: [],
    };
    setListsState(newListsState);
  };

  const addTodo = (elem) => {
    let newState = [
      ...todosState,
      {
        id: getValidId(todosState),
        listId: elem.listId,
        completed: false,
        task: elem.todo,
      },
    ];

    setTodosState(newState);
  };

  const selectList = (newListId) => {
    let newState = {
      ...listsState,
      // currentList: listsState.lists[newListId],
      currentListId: newListId,
    };
    setListsState(newState);
    console.log("selected list. New list is: ");
    console.log(newState);
    currentTodos = listsState.lists.find((element) => {
      if (element.id == listsState.currentListId) {
        return element.todos;
      } else {
      }
    });
  };

  const deleteList = (listId) => {
    let newState;
    console.log("deleting list in App: " + listId);
    let updatedLists = listsState.lists.filter((elem) => {
      if (elem.id != listId) {
        return elem;
      }
      if (listId == listsState.currentListId) {
        newState = {
          ...listsState,
          currentListId:
            listsState.lists[0].id == listId
              ? listsState.lists[1].id
              : listsState.lists[0].id,
        };
      } else {
        newState = { ...listsState };
      }
    });
    newState.lists = updatedLists;
    console.log("new State after deleting list: ");
    console.log(newState);
    setListsState(newState);
  };

  const deleteTodo = (todoId) => {
    let updatedTodos = todosState.filter((elem) => {
      if (elem.id !== todoId) {
        return elem;
      }
    });
    setTodosState(updatedTodos);
  };

  const returnListName = () => {
    // return props.listsState.lists.find(element => element.id == props.currentListId);
    let result = listsState.lists.find(
      (element) => element.id == listsState.currentListId
    );
    return result.name;
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

  return (
    <div>
      <Navbar className="sticky-top" bg="light" expand="md">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row>
          <Nav
            style={{ background: "pink" }}
            id="sidebarMenu"
            className="col-md-4 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div style={{ background: "#eee" }} class="sidebar-sticky pt-3">
              <ListForm onAddList={addList} />
              <Lists
                onChangeList={selectList}
                onDeleteList={deleteList}
                listsState={listsState}
                currentListId={listsState.currentListId}
              />
            </div>
          </Nav>

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <div>Stuff goes here</div>
                <Query query={FEED_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;
                    console.log("gql data: ");
                    console.log(data);
                    //const linksToRender = data;
                    return (
                      <div>
                        {" "}
                        poop
                        {/* {linksToRender.map((link) => (
                          <div>{link.name}</div>
                        ))} */}
                      </div>
                    );
                  }}
                </Query>
                <TodoForm
                  onAddTodo={addTodo}
                  listId={listsState.currentListId}
                />
                <h3>Todo Items For {returnListName()}:</h3>
                <Todos
                  todos={todosState}
                  deleteTodo={deleteTodo}
                  checkTodo={checkTodo}
                  listId={listsState.currentListId}
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
