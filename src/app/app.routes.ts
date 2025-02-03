import type { RouteRecordRaw } from "vue-router"; 
/** 
 * routes register directly 
 */ 
const baseRoutes: Array<RouteRecordRaw> = [ 
    { 
        name: '404', 
        path: '/:pathMatch(.*)*', 
        component: () => import('../app/error/404.vue'), 
        meta: { 
            isCleanLayout: true, 
        } 
    }, 
    { 
        name: '403', 
        path: '/access-denied', 
        component: () => import('../app/error/403.vue'), 
        meta: { 
            isCleanLayout: true, 
        } 
    }, 
] 
 
export default baseRoutes;
