import cx from 'classnames';
import React, { useContext, useEffect, useState } from 'react';

import { TodosContext } from '../features/TodosContext';
import ButtonIcon from './ButtonIcon';
import Icon from './Icon';
import TodoForm from './TodoForm';
import { json } from 'body-parser';

const TodoItem = ({ todo }) => {
    //var newTodo = Object.assign(todo)
    const {deleteTodo, toggleTodo } = useContext(TodosContext);
    const [edit, setEdit] = useState(false);
    
    const Delete = (e) => {
      e.preventDefault();
      var result = confirm('Are you sur?')
      if(result) { deleteTodo(todo.id)}
    }
    
    const Edit = (e) => {
      setEdit(true)
      console.log(edit)
    }

    function escFunction(event){
      if(event.keyCode === 27) {
        setEdit(false)
      }
    }
    document.addEventListener("keydown", escFunction, false); 
    const Toggle = (e) => {
      e.preventDefault();
      toggleTodo(todo.id, todo.archived)
    }
    
    function NoteRender(){
      if(!edit){
          if(todo.archived) {
            return(
              <span onClick={Toggle} style={{textDecorationLine: 'line-through'}}> 
              <Icon name = "CheckSquare" />
              { todo.note }
              </span> )
            }
          else {
            return(
              <span onClick={Toggle}> 
              <Icon name = "Square"/>
              {todo.note } 
              </span>)
            }
      }
      else{
        //return( <TodoForm todo={newTodo} />)
        return( <TodoForm />)
      }
    }

    function ButtonRender(){
      if(!edit){
        return (
        <><ButtonIcon 
          icon='Edit'
          title="Edit todo"
          variant="light"
          className="flex-shrink-0"
          onClick = { Edit} />
        <ButtonIcon 
          icon="Trash2"
          title="Delete todo"
          variant="danger"
          className=  "right-auto"
          onClick= { Delete }/></>
        )
      }
      else return(null)
    }
    
    return (<ul key={todo.id}> 
        <span><NoteRender></NoteRender></span>
        <span><ButtonRender></ButtonRender></span> 
       
        

      
      </ul>)
  
  
  /* TODO: write the TodoItem function component
    
    Actions: 
    ------------------------------
    - clicking on the note or the checkbox makes the todo "archived/unarchived"
    - clicking on the "edit" button:
      - replaces the note and checkbox with the `TodoForm` component
      - replaces the "edit" button with a "cancel" button
      - hides the "delete" button
    - clicking on the "delete" button asks for confirmation (native `confirm()` function) before deleting the note
    - when on "edit" mode, submitting the form hides the form and shows the updated note
      -> HINT: you may need to pass an additional property to the `TodoForm` component
    - BONUS: pressing on "Escape" cancels the edit form and shows the original note

    Notes:
    ------------------------------
    - `TodoItem` component has to be a Function Component
    - `TodoItem` component takes only one property: `todo`
    - You don't need to import anything else, all the imports you need have been declared above
    - Use the `ButtonIcon` component to make your buttons
    - Prefer using the `Icon` component to make a beautiful checkbox
    - Buttons should be aligned to the right, no matter the screen size
  */

  
  //return null;
};

export default TodoItem;