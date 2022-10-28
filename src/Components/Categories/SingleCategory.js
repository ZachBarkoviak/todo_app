import React, { useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CatEdit from './CatEdit';


export default function SingleCategory(props) {
  
  const {currentUser} = useAuth()
  const [showEdit, setShowEdit] = useState(false);
  
  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)){
      axios.delete(`https://localhost:7221/api/Categories/${id}`).then(() => {
        props.getCategories()
      })
    }
  }


  return (
    <div className='col-md-5 m-4 border border-3 border-info rounded pt-2 pb-5 bg-dark text-white'>
        <h3 className='text-center'>{props.category.catName}</h3>
        <p>{props.category.catDesc}</p>
        {/* EDIT UI START */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div>
            <button className='btn btn-success mx-1 text-info' id='editLink' onClick={() => setShowEdit(true)}>Edit</button>
            <button className='btn btn-warning mx-1 text-danger' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>Delete</button>
            {showEdit &&
              <CatEdit
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getCategories={props.getCategories}
                category={props.category}
              />
            }
          </div>
        }
        {/* EDIT UI END */}
    </div>
  )
}
