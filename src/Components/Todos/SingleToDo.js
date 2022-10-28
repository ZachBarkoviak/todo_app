import React, {useState} from 'react'

import { useAuth } from '../../contexts/AuthContext'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'

export default function SingleToDo(props) {
  const {currentUser} = useAuth()
const [showEdit, setShowEdit] = useState(false);

  const deleteToDo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)){
      axios.delete(`https://localhost:7221/api/ToDoes/${id}`).then(() => {props.getToDos()})
    }
  }

  return (
    <div className='col-md-5 m-4 border border-3 border-info rounded pt-2 pb-3 bg-dark text-white'>
        <h3 className={props.todo.done === true ? 'bg-success' : 'bg-danger'}>{props.todo.name}</h3>
        <p>Category: {props.todo.category.catName}</p>
        <p>Status: {props.todo.done === true ? 'Done' : 'Incomplete'}</p>

        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div>
            <button id='editLink' className='btn btn-info text-dark mx-1' onClick={() => setShowEdit(true)}>
              Edit
            </button>
            <button className='btn btn-danger text-white mx-1' id='deleteLink' onClick ={() => deleteToDo(props.todo.toDoId)}>
              Delete
            </button>
            {showEdit &&
              <ToDoEdit
                todo={props.todo}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getToDos={props.getToDos}
              />
            }
          </div>
        }


    </div>
  )
}
