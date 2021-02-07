import axios from 'axios';
import { setCookie , destroyCookie} from 'nookies';

import { LOGIN,  SET_TOKEN } from '../types'

export const login = (data) => ({
    type: LOGIN,
    user: data.user,
    token: data.access_token,
    // fqdn: data.fqdn
});


export const startLogin = (data = {}) => {
    return async (dispatch) => {
        // perform all necessary call to the server
        // const data = { email, password };

        try {
            // console.log({ url: process.env.API_URL })
            // const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, data);
            if (data) {
            // console.log('res', res.data);
                //   Coookies store
                setCookie(null, 'jwt', data.access_token, {
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                });

                // setCookie(null, 'user', JSON.stringify(res.data.data), {
                //     maxAge: 7 * 24 * 60 * 60,
                //     path: '/',
                // });
                //   dispatch to store
                // if (res.data.code != 200) throw { response: { status: res.data.code, message: res.data.data.message} };
                //  const payload  = {
                //      token : res.data.data.token,
                //      user: res.data.data
                //  }   
                return dispatch(login(data));
            }
        } catch (error) {
            throw error;
        }
    }
}



export const setToken = (token) => ({
    type: SET_TOKEN,
    token
});


export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});


export const startLogout = () => {
    
    return async (dispatch) => {
    try {
        // destroyCookie(null, 'user');

        destroyCookie(null, 'jwt');

        return dispatch(login({token: '', user: ''}));
    } catch (error) {
        throw error;
    }
    }
   
}


