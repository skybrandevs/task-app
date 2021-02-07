import axios from 'axios';

import cookie from 'js-cookie';
const axiosClient = axios.create({
    baseURL: `https://${process.env.API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.get('jwt')}`
    }
})


export default axiosClient;