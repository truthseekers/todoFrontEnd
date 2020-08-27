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

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
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
  ALL_LISTS,
  DELETE_LIST,
  DELETE_TODO_ITEM,
  GET_LIST_IDS,
  LIST_TODOS,
  LOGIN_MUTATION,
  ME,
  NEW_LIST,
  NEW_TODO,
  SIGNUP_MUTATION,
  UPDATE_TODO_ITEM,
}; // don't I need to add ALL_LISTS here to be able to import it?
