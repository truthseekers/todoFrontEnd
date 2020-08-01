import gql from "graphql-tag";

const LIST_TODOS = gql`
  query getListTodos($listId: ID!) {
    listById(listId: $listId) {
      id
      title
      todos {
        id
        isCompleted
        name
      }
    }
  }
`;

const ALL_LISTS = gql`
  query allLists {
    lists {
      title
      id
    }
  }
`;

const NEW_LIST = gql`
  mutation addNewList($newList: String!) {
    newList(title: $newList) {
      id
      title
    }
  }
`;

const DELETE_LIST = gql`
  mutation deletingList($listId: ID!) {
    deleteList(listId: $listId) {
      list {
        id
      }
    }
  }
`;

export { LIST_TODOS, NEW_LIST, ALL_LISTS, DELETE_LIST }; // don't I need to add ALL_LISTS here to be able to import it?
