// import type { RouteRecordRaw } from "vue-router";
// const routes: Array<RouteRecordRaw>=[
//     {
//         path: '/login',
//         name: 'login',
//         component: ()=>import('../app-login/login.vue')
//     }

// ]

// export default routes;

import type { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw>=[
    {
        path: '/login',
        name: 'login',
        component: ()=>import('./login.vue'),

        meta:{
            isCleanLayout : true,
            name: "Home"
        }
    }

]
export default routes;