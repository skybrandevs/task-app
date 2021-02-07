import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';

const RegisterForm = () => (
  <div>
    {/* <h1>Anywhere in your app!</h1> */}
    <Formik
      initialValues={{name: '' , email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        //   alert(process.env.API_URL)
          
        let data = await axios.post('http://'+ process.env.API_URL + '/register',values);
        
        setTimeout(() => {
          alert(JSON.stringify(data, null, 2));
          setSubmitting(false);
        }, 400);
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
            type="name"
            name="name"
            placeholder='Enter Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
        
          <input
          className='form-control invalid mt-2'
            type="email"
            name="email"
            placeholder='Enter Email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input className='form-control mt-2'
          placeholder='Enter Password'
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
);

export default RegisterForm;
