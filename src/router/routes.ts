import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "homepage",
    component: () => import("@/views/homePage/homepageFull.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/app-login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/app-register/register.vue"),
  },
];

export default routes;
