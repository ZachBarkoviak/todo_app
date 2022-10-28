import React from 'react'
import { Formik, Form, Field } from 'formik' //This will produce the form for creating/editing a category
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'


export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        //Below is the Create Logic of handleSubmit()
        if (!props.category){
            //Below is the logic for CREATING a new category
            const catToCreate = values//assemble a temp object to send in our request

            //send the object in a POST request to the API
            axios.post(`https://localhost:7221/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//this will close the form. we passed this callback function from Categories.js
                props.getCategories()//this makes a GET request to the API, passed from Categories.js
            })
        } 
        //Below is the Edit logic of handleSubmit()
        else{
            //because our form only captures the Category name and description, we need to pass an entire object 
            //into the PUT request, including the categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`https://localhost:7221/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.getCategories();
                props.setShowEdit(false);
            })
        }
    }




  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //below is a ternary operator that makes our form behave differently based on where we have a
                //prop call category (If we have one, we're editing, if not it's a create form)
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
                
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}
        >
            {({errors, touched}) => (
                //Inside these parens we will build our form
                <Form id='catForm' className='row text-center m-auto'>
                    <div className='form-group m-1 p-1'>
                        <Field name='catName' className='form-control' placeholder='Name' />
                        {errors.catName && touched.catName ?
                            <div className='text-danger'>{errors.catName}</div>
                        : null}
                    </div>
                    <div className='form-group m-1 p-1'>
                        <Field name='catDesc' className='form-control' placeholder='Description' />
                        {errors.catDesc && touched.catDesc ?
                            <div className='text-danger'>{errors.catDesc}</div>
                        : null}
                    </div>
                    <div className='form-group m-1'>
                        <button type='submit' className='btn btn-success'>Submit Category to API</button>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  )
}
