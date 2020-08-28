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
import { GET_LIST_IDS, DELETE_LIST, ALL_LISTS } from "./queries";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import ListForm from "./components/ListForm";
import ListsContainer from "./components/ListsContainer";
import { AuthContext } from "./AuthContext";

function AppContainer(props) {
  const [state, setState] = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_LIST_IDS);
  const [open, setOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <NavTodo userName={props.userName} />
      <Container fluid>
        <Row>
          <SidebarTodo />

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
                    <div id="mobile-lists">
                      <ListForm />
                      <ListsContainer />
                    </div>
                  </Collapse>
                </div>{" "}
                <CurrentListContainer listId={state.currentListId} />
              </Col>
            </Row>
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default AppContainer;
