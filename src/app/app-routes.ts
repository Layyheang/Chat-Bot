import { createRouter,createWebHistory } from "vue-router"; // vue- router library 
import middleware from '../app/middleware/route-guard'
import routes from '../util/generate-routes' // create to view all routes.ts in view folder 
import baseRoutes from "../app/app.routes";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),  // vue-router document 
    routes: [
        ...routes,
        ...baseRoutes
    ]
})

router.beforeEach(middleware)

export default router  // function to call router use 
