import axios from 'axios';
import React, {
  createContext, useEffect, useState,
} from 'react';

export const TodosContext = createContext({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(
      () => {
        axios.get("/api/todos")
        .then(res => {
            setTodos(res.data)
        })
      },
      [],
    );

  const methods = {
    addTodo: (todo) => {
      var newTodos = []
      newTodos.push(todos)
      axios.post("/api/todos", {"note" : todo})
      .then(res => {
        newTodos.push(res.data)
      })
      setTodos(newTodos)
      window.location.reload(false);

    },

    updateTodo: (id, todo) => {
      var newTodos = []
      newTodos.push(todos)
      axios.put("/api/todos/" + id, {"note" : todo} )
      .then(res => {
        newTodos.push(res.data)
      })
      setTodos(newTodos)
      window.location.reload(false);

    },

    toggleTodo: (id, archived) => {
      var newTodos = []
      newTodos.push(todos)
      if(archived){
        axios.post("/api/todos/" + id +"/unarchive" )
        .then(res => {
          newTodos.push(res.data)
        })
      }
      else {
        axios.post("/api/todos/" + id +"/archive" )
        .then(res => {
          newTodos.push(res.data)
        })
      }
      setTodos(newTodos)
      window.location.reload(false);
    },
    deleteTodo: (id) => {
      var newTodos = []
      newTodos.push(todos)
      axios.delete("/api/todos/"+id)
      window.location.reload(false);
      /* TODO: delete todo on both server and interface
        - make an API call (using axios) to delete the todo based on the `id` argument
        - on server response, delete the todo from the todos list using `setTodos()`
      */
    },
  };

  return (
    <TodosContext.Provider value={{ todos, ...methods }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;