import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

import { login } from '../redux/actions/auth';
import { redirectUser } from './auth'
import {  destroyCookie} from 'nookies';

export default async function  (context , token = null) {
    const { store } = context;
    if (token) {
        // decode the token
        const decoded = jwt_decode(token);
        // token expired
        if (moment().unix() > +decoded.exp && (context.req.url != '/signin')) {
       

            destroyCookie(null, 'jwt');

           await store.dispatch(login({token: '', user: ''}));

            redirectUser(context, '/signin');
        }

        let user = parseCookies(context).jwt;
        console.log(user)
        if (user) {
            // reach out to nookies and grab the user
            user = JSON.stringify(user);
            console.log(user)

            const data = { access_token: user, user: '', fqdn: '' }
            console.log(data)

            store.dispatch(login(data));
        }
    }
}


// if(!req.url.includes('/app')) {
//     redirectUser(context, '/app')
// }