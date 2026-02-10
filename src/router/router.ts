import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Landing from "@/pages/LandingPage/LandingView.vue";

// Businessman Routes
import BusinessmanView from "@/pages/Businessman/BusinessmanView.vue";
import SignupView from "@/pages/Signup/SignupView.vue";

// LGU Routes

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/businessman",
    name: "Businessman",
    component: BusinessmanView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
