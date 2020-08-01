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
import { useMutation } from "@apollo/react-hooks";
import { LIST_TODOS } from "./queries";

const TODO_ITEM = gql`
  mutation deleteTodoItem($todo: ID!) {
    deleteTodo(todoId: $todo) {
      id
      name
    }
  }
`;

let defaultListsState = {
  currentListId: 58,
};

function App() {
  const [listsState, setListsState] = useState(defaultListsState);
  const [todosState, setTodosState] = useState([]);
  const [deleteTodo] = useMutation(TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      const { listById } = cache.readQuery({
        query: LIST_TODOS,
        variables: {
          listId: listsState.currentListId,
        },
      });

      let updatedTodos = listById.todos.filter((todo) => {
        if (todo.id !== deleteTodo.id) {
          return todo;
        }
      });

      let newListById = { ...listById };
      newListById.todos = updatedTodos;

      cache.writeQuery({
        query: LIST_TODOS,
        data: {
          listById: newListById,
        },
      });
    },
  });

  const selectList = (newListId) => {
    let newState = {
      ...listsState,
      currentListId: newListId,
    };
    setListsState(newState);
  };

  const onDeleteTodo = (todoId) => {
    deleteTodo({
      variables: { todo: todoId },
    });

    // let updatedTodos = todosState.filter((elem) => {
    //   if (elem.id !== todoId) {
    //     return elem;
    //   }
    // });
    // setTodosState(updatedTodos);
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
          <SidebarTodo
            selectList={selectList}
            listsState={listsState}
            currentListId={listsState.currentListId}
          />

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <TodoForm listId={listsState.currentListId} />
                <Todos
                  todos={todosState}
                  deleteTodo={onDeleteTodo}
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
