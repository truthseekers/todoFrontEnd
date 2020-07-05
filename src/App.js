import React, { useState } from 'react';
import './App.css';
import List from './List';
import Lists from './Lists';
import ListForm from './ListForm';
import Todos from './Todos';

let defaultListsState = {
  lists: [
    {
      id: 0, name: "shopping", todos: [
        { id: 0, completed: false, task: "Salad" },
        { id: 1, completed: false, task: "$6000 of Toilet Paper" },
        { id: 2, completed: true, task: "Dog treats" },
      ]
    },
    {
      id: 1, name: "misc", todos: [

      ]
    },
    {
      id: 2, name: "travel", todos: [

      ]
    },
    {
      id: 3, name: "business", todos: [

      ]
    }
  ],
  currentListId: 0
};

// let currentListId = 0;
// let currentList = defaultLists.find((elem) => {

// })
// let defaultLists = [
//   {
//     id: 0, name: "shopping", todos: [
//       { id: 0, completed: false, task: "Salad" },
//       { id: 1, completed: false, task: "$6000 of Toilet Paper" },
//       { id: 2, completed: true, task: "Dog treats" },
//     ]
//   },

//   {
//     id: 1, name: "misc", todos: [
//       { id: 3, completed: false, task: "Trim bushes" },
//       { id: 4, completed: false, task: "Put on my socks" },

//     ]
//   },
//   {
//     id: 2, name: "travel", todos: [
//       { id: 5, completed: false, task: "Buy plane ticket" },
//     ]
//   },
//   {
//     id: 3, name: "business", todos: [
//       { id: 6, completed: false, task: "Call accountant" },
//       { id: 7, completed: false, task: "Fire Bob" },
//     ]
//   }
// ]


// let defaultCurrentTodos = defaultTodos.filter((elem) => {
//   if (elem.listId == 1) {
//     return elem;
//   }
// })

function getValidId(lists) {
  console.log("in getid");
  let maxId = lists.length;
  lists.forEach((elem) => {
    if (elem.id >= maxId) {
      maxId = elem.id + 1;
    }
  })
  console.log("new id is: " + maxId);
  console.log(lists);
  return maxId;
}


function App() {

  const [listsState, setListsState] = useState(defaultListsState);
  let currentTodos;

  // addNewTodo
  const addList = (elem) => {
    console.log("from App. elem: ");
    console.log(elem);
    let newListsState = { ...listsState };

    getValidId(listsState.lists)

    newListsState.lists[newListsState.lists.length] = {
      id: getValidId(listsState.lists),
      name: elem,
      todos: []
    };
    setListsState(newListsState);
    // let newTodos = [
    //   ...todos,
    //   { task: elem, id: currentTodos.length, listId: 1 }
    // ];
    // setTodos(newTodos);
  }

  const selectList = (newListId) => {
    let newState = {
      ...listsState,
      currentList: listsState.lists[newListId],
      currentListId: newListId
    }
    setListsState(newState);
    currentTodos = listsState.lists.find((element) => {
      if (element.id == listsState.currentListId) {
        console.log("match match!");
        return element.todos;
      } else {
        console.log("NOOOOO MATCH");
      }
    });
    console.log("currentTodos (list actually)");
    console.log(currentTodos);
  }

  const deleteList = (listId) => {
    console.log("deleting list in App: " + listId);
    let updatedLists = listsState.lists.filter((elem) => {
      if (elem.id != listId) {
        return elem;
      }
    });
    let newState = { ...listsState }
    newState.lists = updatedLists;

    setListsState(newState);
  }

  const returnCurrentList = () => {
    console.log("hello from returnCurrentList");
    return listsState.lists.find(element => element.id == listsState.currentList2);
  }

  // const updateCurrentTodos = () => {
  //   let newTodos = defaultTodos.filter((elem) => {
  //     if (elem.listId == currentList.id) {
  //       return elem;
  //     }
  //   })

  //   setCurrentTodos(newTodos);
  // }



  // const updateTodo = (updatedItem) => {
  //   console.log(updatedItem);
  //   let newState = lists;
  //   // let newTodos = currentTodos.map((elem) => {
  //   //   if (updatedItem == elem.id) {
  //   //     return { ...elem, completed: !elem.completed }
  //   //   } else {
  //   //     return elem;
  //   //   }
  //   // })
  //   // setCurrentTodos(newTodos);
  // }

  return (
    <div className="App">


      <div className="list-area">
        <h3>Create a new List:</h3>
        <ListForm onAddList={addList} />
        {/* There should be a way to compute the currentList here instead of passing in listId and generating list in Lists */}
        <Lists onChangeList={selectList} onDeleteList={deleteList} listsState={listsState} currentListId={listsState.currentListId} />
        <Todos testProp={listsState.todos} />

      </div>


    </div>
  );
}

export default App;
