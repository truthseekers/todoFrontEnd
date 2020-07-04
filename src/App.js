import React, { useState } from 'react';
import './App.css';
import List from './List';
import Lists from './Lists';
import ListForm from './ListForm';

let defaultTodos = [
  { id: 0, listId: 0, task: "trim bushes", completed: false },
  { id: 1, listId: 1, task: "Eat breakfast", completed: false },
  { id: 2, listId: 2, task: "Put on my socks", completed: true },
  { id: 3, listId: 2, task: "Stare at wall for 5 minutes", completed: false },
  { id: 4, listId: 1, task: "buy $6000 of toilet paper", completed: true },
  { id: 5, listId: 3, task: "Eat a salad", completed: false }
]

let defaultCurrentTodos = defaultTodos.filter((elem) => {
  if (elem.listId == 1) {
    return elem;
  }
})

function App() {

  const [todos, setTodos] = useState(defaultTodos);
  const [currentList, setCurrentList] = useState({ id: 1, name: 'todos' });
  const [currentTodos, setCurrentTodos] = useState(defaultCurrentTodos);


  // addNewTodo
  const addTodo = (elem) => {
    console.log("from App. elem: ");
    console.log(elem);
    let newTodos = [
      ...todos,
      { task: elem, id: currentTodos.length, listId: 1 }
    ];
    setTodos(newTodos);
  }

  const changeList = (newList) => {
    console.log("FROM APP changed to list: ");
    console.log(newList);
    setCurrentList(newList[0]);
    updateCurrentTodos();
  }

  const updateCurrentTodos = () => {
    let newTodos = defaultTodos.filter((elem) => {
      if (elem.listId == currentList.id) {
        return elem;
      }
    })

    setCurrentTodos(newTodos);
  }



  const updateTodo = (updatedItem) => {
    console.log(updatedItem);
    let newTodos = currentTodos.map((elem) => {
      if (updatedItem == elem.id) {
        return { ...elem, completed: !elem.completed }
      } else {
        return elem;
      }
    })
    setCurrentTodos(newTodos);
  }

  return (
    <div className="App">
      <Lists onChangeList={changeList} currentList={currentList} />
      <ListForm onAddTodo={addTodo} />
      <List todos={currentTodos} handleTodo={updateTodo} />
    </div>
  );
}

export default App;
