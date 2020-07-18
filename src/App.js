import React, { useState } from "react";
import "./dashboard.css";
import "./App.css";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import NavTodo from "./NavTodo";
import SidebarTodo from "./SidebarTodo";

const FEED_QUERY = gql`
  {
    lists {
      id
      title
    }
  }
`;

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
  let maxId = lists.length;
  lists.forEach((elem) => {
    if (elem.id >= maxId) {
      maxId = elem.id + 1;
    }
  });
  return maxId;
}

function App() {
  const [listsState, setListsState] = useState(defaultListsState);
  const [todosState, setTodosState] = useState(defaultTodosState);
  let currentTodos;

  const addList = (elem) => {
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
      currentListId: newListId,
    };
    setListsState(newState);
    currentTodos = listsState.lists.find((element) => {
      if (element.id == listsState.currentListId) {
        return element.todos;
      } else {
      }
    });
  };

  const deleteList = (listId) => {
    let newState;
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
      <NavTodo />
      <Container fluid>
        <Row>
          <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;
              console.log("gql data: ");
              console.log(data.lists);
              const listsToRender = data.lists;
              return (
                <div>
                  <SidebarTodo
                    addList={addList}
                    selectList={selectList}
                    deleteList={deleteList}
                    listsState={listsState}
                    currentListId={listsState.currentListId}
                  />
                  {listsToRender.map((list) => (
                    <div>{list.title}</div>
                  ))}
                </div>
              );
            }}
          </Query>

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
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
