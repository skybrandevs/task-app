import Router from 'next/router';
import { parseCookies } from 'nookies';
export  function auth (context) {

    const token = parseCookies(context).jwt;
    if (!token && (context.req.url !== '/login')) {
        //   console.log('ll',context.req)
        redirectUser(context, '/login')
        return;
    }

    return token;
}


export function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}