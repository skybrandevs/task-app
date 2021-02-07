// import Router from 'next/router';
import { parseCookies } from 'nookies';
export default function (context: any) {

    const token = parseCookies(context).jwt;
    if (!token) {
        //   console.log('ll',context.req)
        // redirectUser(context, '/signin')
        return;
    }

     return token;
}

