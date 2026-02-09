import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Landing",
        component: () => import('@/pages/LandingPage/LandingView.vue'),
    },
   {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Auth/Login.vue'),
        meta: {
            title: 'Login',
            guard: 'guest'
        }
    },
    // Registration
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/Auth/Register.vue'),
        meta: {
            title: 'User Registration',
            guard: 'guest'
        }
    },
    // Error Pages
    {
        path: '/access-denied',
        name: 'access-denied',
        component: () => import('@/pages/errors/AccessDenied.vue'),
        meta: {
            title: 'Access Denied'
        }
    },
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: () => import('@/pages/errors/404.vue'),
        meta: {
            title: 'Page Not Found'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-not-found'
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
