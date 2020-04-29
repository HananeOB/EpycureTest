import React, { useContext } from 'react';

import { TodosContext } from '../features/TodosContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const Todos = () => {
  const { todos } = useContext(TodosContext);
  function compare(t1,t2){
    if(t1.archived){
      if(t2.archived) { return (t1.created_at - t2.created_at)}
      else {
        return 1
      }
    }
    else{
      if(t2.archived) { return -1}
      else { 
        return(t1.created_at - t2.created_at)
      }
    }
  }
  todos.sort(compare)
  const sortedTodos = todos;

  return (
    <section>
      <h1 className="mb-4 text-xl font-bold text-gray-600">
        To-Dos
      </h1>
      <TodoForm/>
      <section>
        {sortedTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
    </section>
  );
};

export default Todos;