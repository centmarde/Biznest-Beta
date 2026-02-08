import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import {
  AdminRoutes,
  LGORoutes
} from "@/lib/routes"


// Businessman Routes

// LGU Routes

const routes: RouteRecordRaw[] = [
  ...AdminRoutes,
  ...LGORoutes,
   {
        path: '/',
        name: 'login',
        component: () => import('@/pages/Auth/Login.vue'),
        meta: {
            title: 'PCIC Staff Login',
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
            guard: 'guest',
            requiresToken: true
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
