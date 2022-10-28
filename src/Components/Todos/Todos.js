import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo';
import FilterCat from './FilterCat';
import './ToDos.css'
import { useAuth } from '../../contexts/AuthContext';
import ToDoCreate from './ToDoCreate';


export default function Todos() {
  const [toDos, setToDos] = useState([]);

  const [filter, setFilter] = useState(0);

  const {currentUser} = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  const getToDos = () => {
    axios.get('https://localhost:7221/api/ToDoes').then(response => {
      console.log(response)
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, []);

  return (
    <section className='todos'>
      <article className='bg-info p-5'>
        <h1 className='text-center'>ToDos Dashboard</h1>
      </article>
      {/* CREATE UI START */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className='bg-dark p-2 mb-3 text-center'>
          <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create new ToDo' : 'Close Form'}
          </button>
          <div className='createContainer'>
            {showCreate &&
              <ToDoCreate
                setShowCreate={setShowCreate}
                getToDos={getToDos}
              />
            }
          </div>
        </div>
      }
      {/* CREATE UI END */}
      <FilterCat setFilter={setFilter} />
      <Container>
        <article className='row justify-content-center'>
        {filter === 0 ? toDos.map(x => 
                    <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                ) : 
                toDos.filter(x => x.categoryId === filter).map(x => 
                    <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                )}
                {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
                    <h2 className='alert alert-warning text-dark'>
                        There are no results for this category.
                    </h2>
                }
        </article>
      </Container>
    </section>
  )
}
