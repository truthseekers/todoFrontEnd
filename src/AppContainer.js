import React, { useState } from "react";
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

function AppContainer(props) {
  const { data, loading, error } = useQuery(GET_LIST_IDS);
  const [currentListId, setCurrentListId] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
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
    // console.log("selecting list from appContainer");
    setCurrentListId(newListId);
  };

  const onDeleteList = (listId) => {
    deleteList({
      variables: { listId: listId },
    });
  };

  return (
    <div>
      <NavTodo userName={props.userName} />
      <Container fluid>
        <Row>
          <SidebarTodo
            selectList={selectList}
            userData={props.userData}
            currentListId={currentListId}
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
                    <div id="mobile-lists">
                      <ListForm userData={props.userData} />
                      <ListsContainer selectList={selectList} />
                    </div>
                  </Collapse>
                </div>{" "}
                <CurrentListContainer
                  isListEmpty={isListEmpty}
                  listId={currentListId}
                />
              </Col>
            </Row>
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default AppContainer;
