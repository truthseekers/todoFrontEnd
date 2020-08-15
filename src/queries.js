import gql from "graphql-tag";

const LIST_TODOS = gql`
  query getListTodos($listId: ID!) {
    listById(listId: $listId) {
      id
      title
      postedBy {
        id
        name
      }
      todos {
        id
        isCompleted
        name
        postedBy {
          name
          id
        }
      }
    }
  }
`;

const ALL_TODOS = gql`
  query getAllTodos {
    todos {
      name
      id
      __typename
    }
  }
`;

const ALL_LISTS = gql`
  query allLists {
    lists {
      title
      id
      postedBy {
        name
        id
      }
    }
  }
`;

const GET_LIST_IDS = gql`
  query getDefaultList {
    lists {
      id
    }
  }
`;

const DELETE_TODO_ITEM = gql`
  mutation deleteTodoItem($todo: ID!) {
    deleteTodo(todoId: $todo) {
      id
      name
    }
  }
`;

const UPDATE_TODO_ITEM = gql`
  mutation updateTodo($todo: ID!, $isCompleted: Boolean!) {
    updateTodo(todoId: $todo, isCompleted: $isCompleted) {
      id
      name
      isCompleted
    }
  }
`;

const ME = gql`
  query meQuery {
    me {
      id
      name
    }
  }
`;

const NEW_LIST = gql`
  mutation addNewList($title: String!, $userId: ID!) {
    newList(title: $title, userId: $userId) {
      id
      title
    }
  }
`;

const NEW_TODO = gql`
  mutation createNewTodo($newTodo: String!, $listId: ID!) {
    createTodo(name: $newTodo, listId: $listId) {
      id
      name
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

export {
  LIST_TODOS,
  ME,
  NEW_LIST,
  NEW_TODO,
  ALL_LISTS,
  DELETE_LIST,
  DELETE_TODO_ITEM,
  ALL_TODOS,
  UPDATE_TODO_ITEM,
  GET_LIST_IDS,
}; // don't I need to add ALL_LISTS here to be able to import it?
