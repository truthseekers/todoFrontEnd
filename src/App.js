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
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODOS });

      let updatedTodos = todos.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: updatedTodos,
        },
      });
    },
  });

  const [createTodo] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      const thingOne = cache.readQuery({ query: ALL_TODOS });
      console.log("now we update in here braaahh thingOne");
      console.log(thingOne);

      console.log("newTodo from mutation: ");
      console.log(createTodo);

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [createTodo, ...thingOne.todos],
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

  const handleSubmit = (event) => {
    event.preventDefault();

    createTodo({
      variables: { listId: listsState.currentListId, newTodo: taskField },
    });
    setTaskField("");
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
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <input
                        type="text"
                        placeholder="Add a Todo"
                        value={taskField}
                        onChange={handleChange}
                        name="name"
                      />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
                {/* <TodoForm listId={listsState.currentListId} /> */}
                <p>CurrentList ID: {listsState.currentListId}</p>
                <Todos
                  todos={data.todos}
                  deleteTodo={onDeleteTodo}
                  checkTodo={checkTodo}
                  listId={listsState.currentListId}
                />
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
