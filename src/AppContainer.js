import React, { useState, useContext } from "react";
import "./dashboard.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTodo from "./NavTodo";
import SidebarTodo from "./SidebarTodo";
import { useQuery } from "@apollo/react-hooks";
import CurrentListContainer from "./CurrentListContainer";
import { GET_LIST_IDS, ME } from "./queries";
// import AuthContext from "./AuthContext";
import Me from "./Me";
import { Query } from "react-apollo";
import authContext from "./AuthContext";

function AppContainer(props) {
  // const theme = useContext();
  const { data, loading, error } = useQuery(GET_LIST_IDS);
  const meQuery = useQuery(ME);
  const [currentListId, setCurrentListId] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [todosState, setTodosState] = useState([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("THERE WAS N ERROR!");
    return <div>Error</div>;
  }

  //  console.log("the user data most likely done wrong: ");
  // console.log(meQuery.data);

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

  console.log("PROPS MAAN");
  console.log(props);

  return (
    <div>
      <NavTodo
        userName={props.userName}
        setLoggedInUser={props.setLoggedInUser}
        // setLoggedInUser={props.loggedInUser}
      />
      <Container fluid>
        <Row>
          <SidebarTodo selectList={selectList} currentListId={currentListId} />

          <main className="col-md-8 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              <Col>
                <CurrentListContainer
                  isListEmpty={isListEmpty}
                  listId={currentListId}
                />
              </Col>
            </Row>
            <div>
              Calm r tits{" "}
              {props.userData && props.loggedInUser
                ? props.userData.me.name
                : "nobody here"}
              <Me />
            </div>
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
