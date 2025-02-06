import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"; // Import the defined routes

const router = createRouter({
    history: createWebHistory(),
    routes
});

// ✅ Navigation Guard (Protect Routes)
router.beforeEach((to, _from, next) => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
    } else {
        next(); // Allow navigation
    }
});

export default router;
