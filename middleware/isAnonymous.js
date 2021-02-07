import { parseCookies } from 'nookies'
import moment from 'moment'
import jwt_decode from 'jwt-decode'
import { login } from '../redux/actions/auth';
import {  destroyCookie} from 'nookies';
export default async function (context) {

    const token = parseCookies(context).jwt;
    const { store } = context;
    if (token) {
           // decode the token
           const decoded = jwt_decode(token);

        if (moment().unix() > +decoded.exp) {
            destroyCookie(null, 'user');

            destroyCookie(null, 'jwt');
    
            await store.dispatch(login({token: '', user: ''}));
            // do nothing
            // store.dispatch(login({}));
        }

        let user = parseCookies(context).user;
        if (user) {
            // reach out to nookies and grab the user
            user = JSON.parse(user);
            const data = { token, user, fqdn: user.email }

            store.dispatch(login(data));
        }
       
    } else {
        destroyCookie(null, 'user');

        destroyCookie(null, 'jwt');

        await store.dispatch(login({token: '', user: ''}));
        // do nothing
        // store.dispatch(login({}));
    }

}