import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Max 25 characters').required('Name is required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const toDoSchema = Yup.object().shape({
    name: Yup.string().max(30,'Max 30 characters').required(),
    done: Yup.bool(),
    categoryId: Yup.number()
})


export {catSchema}
export default toDoSchema