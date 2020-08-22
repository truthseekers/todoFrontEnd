import React, { useState, useContext } from "react";
import "./dashboard.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTodo from "./NavTodo";
import SidebarTodo from "./SidebarTodo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import CurrentListContainer from "./CurrentListContainer";
import { GET_LIST_IDS, ME, DELETE_LIST, ALL_LISTS, NEW_LIST } from "./queries";
// import AuthContext from "./AuthContext";
import Me from "./Me";
import { Query } from "react-apollo";
import authContext from "./AuthContext";
import MeQueryHack from "./MeQueryHack";
import Lists from "./Lists";
import { AUTH_TOKEN } from "./constants";
import Collapse from "react-bootstrap/Collapse";
import { separateOperations } from "graphql";
import Button from "react-bootstrap/Button";

function AppContainer(props) {
  // const theme = useContext();
  const { data, loading, error } = useQuery(GET_LIST_IDS);
  const allLists = useQuery(ALL_LISTS);
  const meQuery = useQuery(ME);
  const [currentListId, setCurrentListId] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [todosState, setTodosState] = useState([]);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [taskField, setTaskField] = useState("");
  const [open, setOpen] = useState(false);

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      let updatedLists = lists.filter((elem) => {
        if (elem.id !== deleteList.list.id) {
          return elem;
        }
      });
      if (updatedLists.length !== 0) {
        selectList(updatedLists[0].id);
      }
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: updatedLists,
        },
      });
    },
  });
  const [createList] = useMutation(NEW_LIST, {
    update(cache, { data: { newList } }) {
      const { lists } = cache.readQuery({ query: ALL_LISTS });
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          lists: [newList, ...lists],
        },
      });
      selectList(newList.id);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createList({
      variables: { title: taskField, userId: props.userData.me.id },
    });
  };

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  // data always exists past this point since its after loading conditional
  // If a list exists then set state to first list. Need !currentListId otherwise render infinite loop
  if (!currentListId && data.lists.length > 0) {
    setCurrentListId(data.lists[0].id);
  }

  if (data.lists.length === 0 && !isListEmpty) {
    setIsListEmpty(true);
  } else if (data.lists.length !== 0 && isListEmpty) {
    setIsListEmpty(false);
  }

  const selectList = (newListId) => {
    setCurrentListId(newListId);
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

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  let renderLists;
  if (data.lists.length > 0) {
    renderLists = (
      <div>
        {authToken ? (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  placeholder="Create a new List"
                  type="text"
                  value={taskField}
                  onChange={handleChange}
                  name="name"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <div style={{ fontWeight: "bold", margin: "25px", color: "orange" }}>
            Log in / Sign up to create a todo list!
          </div>
        )}
        <Lists
          loggedInUser={props.loggedInUser}
          onDeleteList={onDeleteList}
          selectList={selectList}
          lists={allLists.data.lists}
          postedBy={allLists.postedBy}
        />
      </div>
    );
  } else {
    renderLists = <p>You have no lists! Create some!</p>;
  }

  return (
    <div>
      <NavTodo
        userName={props.userName}
        // userData={props.userData}
        setLoggedInUser={props.setLoggedInUser}
        loggedInUser={props.loggedInUser}
      />
      <Container fluid>
        {/* <MeQueryHack loggedInUser={props.loggedInUser} /> */}
        <Row>
          <SidebarTodo
            selectList={selectList}
            userData={props.userData}
            currentListId={currentListId}
            loggedInUser={props.loggedInUser}
            deleteList={onDeleteList}
          />

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <div className="lists-mobile">
                  <Button
                    style={{ margin: "20px" }}
                    onClick={() => setOpen(!open)}
                    aria-controls="mobile-lists"
                    aria-expanded={open}
                  >
                    {open ? "Hide Lists" : "Show Lists"}
                  </Button>
                  <Collapse in={open}>
                    <div id="mobile-lists">{renderLists}</div>
                  </Collapse>
                </div>{" "}
                <CurrentListContainer
                  loggedInUser={props.loggedInUser}
                  isListEmpty={isListEmpty}
                  listId={currentListId}
                />
                {/* <SidebarTodo
                  selectList={selectList}
                  userData={props.userData}
                  currentListId={currentListId}
                  loggedInUser={props.loggedInUser}
                /> */}
                {/* <Lists
                  loggedInUser={props.loggedInUser}
                  onDeleteList={onDeleteList}
                  // selectList={props.selectList}
                  lists={allLists.lists}
                  postedBy={allLists.postedBy}
                /> */}
              </Col>
            </Row>
            {/* <authContext.Consumer>
              {(value) => <div>poo value {value} </div>}
            </authContext.Consumer> */}
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default AppContainer;
