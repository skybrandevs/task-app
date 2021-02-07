import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import axiosClient from '../services/axiosClient';
import { startLogin } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { route } from 'next/dist/next-server/server/router';

const Basic = ({startLoginAction}) => 
{

const router = useRouter();
return (
  <div>
    {/* <h1>Anywhere in your app!</h1> */}
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        } 
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        let data = await axiosClient.post('/login', values);
        startLoginAction(data.data)
        router.push('/')
        
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
          className='form-control invalid'
            type="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {errors.username && touched.username && errors.username}
          <input className='form-control mt-2'
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
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