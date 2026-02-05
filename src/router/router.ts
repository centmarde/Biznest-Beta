import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Landing from "@/pages/LandingPage/LandingView.vue";

// Businessman Routes

// LGU Routes

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
