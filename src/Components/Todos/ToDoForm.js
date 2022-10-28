import React, {useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik';
import toDoSchema from '../../utilities/validationSchema'
import axios from 'axios'





export default function ToDoForm(props) {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7221/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(values.done === '0'){
            values.done = false
        } else {
            values.done = true
        }
        if(!props.todo){
            const toDoToCreate = values
            axios.post(`https://localhost:7221/api/ToDoes`, toDoToCreate).then(() => {
                props.getToDos()
                props.setShowCreate(false)
            })
        }
        else {
            const toDoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }
            axios.put(`https://localhost:7221/api/ToDoes/${props.todo.toDoId}`, toDoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <div className='createToDo m-2 text-white text-center'>
        <Formik
            initialValues={{
                name: props.todo ? props.todo.name : '',
                done: props.todo ? props.todo.done : '',
                categoryId: props.todo ? props.todo.categoryId : ''
            }}
            validationSchema={toDoSchema}
            onSubmit={values => handleSubmit(values)}
        >
            {({errors, touched}) => (
                <Form id='toDoForm'>
                    <div className='form-group m-3'>
                        <Field name='name' className='form-control' placeholder='Name' />
                        {errors.name && touched.name ?(
                            <div className='text-danger'>{errors.name}</div>
                        ) : null}
                    </div>
                    <div className='form-group m-3'>
                        <Field as='select' name='done' className='form-control'>
                            <option value={1}>Done</option>
                            <option value={0}>Incomplete</option>
                        </Field>
                    </div>
                    <div className='form-group m-3'>
                        <Field as='select' name='categoryId' className='form-control'>
                            <option value='' disabled>[--Please Choose--]</option>
                            {categories.map(cat =>
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.catName}
                                </option>
                            )}
                        </Field>
                    </div>
                    <div className='form-group m-3'>
                        <button type='submit' className='btn btn-info m-3'>Submit ToDo</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
