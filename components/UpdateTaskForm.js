import React, {useState} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import axiosClient from '../services/axiosClient';
import { startLogin } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/next-server/server/router';
import SweetAlert from 'react-bootstrap-sweetalert';

const Basic = ({startLoginAction, task, onUpdate}) => 
{
console.log(task)
const router = useRouter();
const [success, setSuccess] = useState({
    status: false,
    message: ''
});
return (
  <div>
    {/* <h1>Anywhere in your app!</h1> */}
    <Formik
    enableReinitialize
      initialValues={ task ? { ...task, completed: task && task.completed == 1? true: false }  : { title: '', description: '' , completed: false}}
      validate={values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } 
        return errors;
      }}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (!task) {
            let data = await axiosClient.post(`task`, values).then(()=> {
               
            })
            onUpdate()
            setSuccess({status: true, message: 'Task created'})
            resetForm()

           
          }else {
            //   return alert(JSON.stringify(values))
            let data = await axiosClient.patch(`task/${task.id}`, values).then(()=> {
               
            })
            onUpdate()
            setSuccess({status: true, message: 'Task updated'})
               
       
           
         
      
 
          }
       
        
        // setTimeout(() => {
        //   alert(JSON.stringify(data.data, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setValues
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
            { success.status  &&
            <SweetAlert success title="Good job!" onConfirm={()=> setSuccess({status: false})} onCancel={()=> {}}>
           {success.message}
            </SweetAlert>
            }
            
          <input
          className='form-control invalid'
            type="title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            placeholder='Title'
          />
          {errors.title && touched.title && errors.title}

          <textarea
          className='form-control invalid mt-4'
            type="description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            placeholder='enter description'
          />
          {errors.completed && touched.description && errors.description}


        <div className='d-flex w-50 mt-4'>
        <h6 className='my-auto mr-4'>Status</h6>
        <input className='form-control ml-0 text-align-left width-50px my-auto'
                    type="checkbox"
                    value={values.completed}
                    defaultChecked={values.completed == 1 ? true : false}
                    // checked={values.completed == 1}
                    name="completed"
                    onChange={(() => setValues({...values, completed: !values.completed }))}

                    onBlur={handleBlur}
                />
        </div>
          
      
          {errors.completed && touched.completed && errors.completed}
          <button className='btn btn-primary w-100 mt-4' type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
)
      }



const mapDispatchToProps = (dispatch) => ({
  startLoginAction: (data) => dispatch(startLogin(data)),
})

export default connect(undefined, mapDispatchToProps)(Basic)