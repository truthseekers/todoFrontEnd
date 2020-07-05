import React, { useState } from 'react';
import './App.css';
import List from './List';
import Lists from './Lists';
import ListForm from './ListForm';
import Todos from './Todos';
import TodoForm from './TodoForm';

let defaultListsState = {
  lists: [
    { id: 0, name: "shopping" },
    { id: 1, name: "misc" },
    { id: 2, name: "travel" },
    { id: 3, name: "business" }
  ],
  currentListId: 0
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
  //console.log("in getid");
  let maxId = lists.length;
  lists.forEach((elem) => {
    if (elem.id >= maxId) {
      maxId = elem.id + 1;
    }
  })
  //console.log("new id is: " + maxId);
  //console.log(lists);
  return maxId;
}


function App() {

  const [listsState, setListsState] = useState(defaultListsState);
  const [todosState, setTodosState] = useState(defaultTodosState);
  let currentTodos;

  const addList = (elem) => {
    //console.log("from App. elem: ");
    //console.log(elem);
    let newListsState = { ...listsState };

    getValidId(listsState.lists)

    newListsState.lists[newListsState.lists.length] = {
      id: getValidId(listsState.lists),
      name: elem,
      todos: []
    };
    setListsState(newListsState);

  }

  const addTodo = (elem) => {
    //console.log("adding newTodo: ");
    //console.log(elem);
    let newState = [...todosState, { id: getValidId(todosState), listId: elem.listId, completed: false, task: elem.todo }];

    setTodosState(newState);
  }

  const selectList = (newListId) => {
    let newState = {
      ...listsState,
      // currentList: listsState.lists[newListId],
      currentListId: newListId
    }
    setListsState(newState);
    console.log("selected list. New list is: ");
    console.log(newState);
    currentTodos = listsState.lists.find((element) => {
      if (element.id == listsState.currentListId) {
        return element.todos;
      } else {
      }
    });
    // console.log("currentTodos (list actually)");
    // console.log(currentTodos);
  }

  const deleteList = (listId) => {
    let newState;
    console.log("deleting list in App: " + listId);
    let updatedLists = listsState.lists.filter((elem) => {
      if (elem.id != listId) {
        return elem;
      }
      if (listId == listsState.currentListId) {
        newState = { ...listsState, currentListId: listsState.lists[0].id == listId ? listsState.lists[1].id : listsState.lists[0].id }
      } else {
        newState = { ...listsState }
      }
    });
    newState.lists = updatedLists;
    console.log("new State after deleting list: ");
    console.log(newState);
    setListsState(newState);
  }

  const deleteTodo = (todoId) => {
    let updatedTodos = todosState.filter((elem) => {
      if (elem.id !== todoId) {
        return elem;
      }
    });
    setTodosState(updatedTodos);
  }



  const checkTodo = (updatedItem) => {
    //console.log("in checkTodo");
    //console.log(updatedItem);
    let newState = todosState.map((elem) => {
      if (updatedItem === elem.id) {
        return { ...elem, completed: !elem.completed }
      } else {
        return elem;
      }
    });
    setTodosState(newState);

  }

  return (
    <div className="App">


      <div className="list-area">
        <h3>Create a new Lisssst:</h3>
        <ListForm onAddList={addList} />
        {/* There should be a way to compute the currentList here instead of passing in listId and generating list in Lists */}
        <Lists onChangeList={selectList} onDeleteList={deleteList} listsState={listsState} currentListId={listsState.currentListId} />
        <TodoForm onAddTodo={addTodo} listId={listsState.currentListId} />
        <Todos todos={todosState} deleteTodo={deleteTodo} checkTodo={checkTodo} listId={listsState.currentListId} />

      </div>


    </div>
  );
}

export default App;
