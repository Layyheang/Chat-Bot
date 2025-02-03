// import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
// import { Storage } from '../../util/localStorege/localStorege';

// export default async function (
//     to: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: NavigationGuardNext
// ) {
//     const accessToken = Storage.getAccessToken();
//     if (to.name === '404' || to.name === '500' || to.name === '403') {
//         return next();
//     }

//     if (!accessToken) {
//         return to.path === '/login' ? next() : next('/login');
//     }
//     next(); 
// } 


import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Storage } from '../../util/localStorege/localStorege';

export default async function (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {

    if(to.path =="/") return next ("/login")


    next(); 
}