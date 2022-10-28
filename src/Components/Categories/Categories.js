import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory';
import CatCreate from './CatCreate';



export default function Categories() {
  const [categories, setCategories] = useState([]);

  const {currentUser} = useAuth()
  const [showCreate, setShowCreate] = useState(false);



  const getCategories = () => {
    axios.get('https://localhost:7221/api/Categories').then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className='categories'>
      <article className='bg-info p-5'>
        <h1 className='text-center'>Categories Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className='bg-dark p-2 mb-3 text-center'>
          {showCreate ?
          <>
            <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
            <CatCreate
              getCategories={getCategories}
              setShowCreate={setShowCreate}
            />
          </>
            : <button className='btn btn-info' onClick={() => setShowCreate(true)}>Create Category</button>
          }
        </div>
      }
      <Container>
        <article className='row justify-content-center'>
          {categories.map(x => 
            <SingleCategory key={x.categoryId} category={x} getCategories={getCategories}/>
          )
          }
        </article>
      </Container>
    </section>
  )
}
