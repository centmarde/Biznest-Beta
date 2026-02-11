import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Landing from "@/pages/LandingPage/LandingView.vue";

// Admin Routes
import DashboardAdmin from "@/pages/admin/admin-dashboard/components/SidebarDashboard.vue";
import DashboardAnalytics from "@/pages/admin/admin-dashboard/components/SidebarAnalytics.vue";
import DashboardBusinessOwners from "@/pages/admin/admin-dashboard/components/SidebarBusinessOwners.vue";
import DashboardProperties from "@/pages/admin/admin-dashboard/components/SidebarProperties.vue";
import DashboardTransactions from "@/pages/admin/admin-dashboard/components/SidebarTransactions.vue";
import DashboardSupport from "@/pages/admin/admin-dashboard/components/SidebarSupport.vue";
import DashboardSettings from "@/pages/admin/admin-dashboard/components/SidebarSettings.vue";

// Businessman Routes

// LGU Routes

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/dashboard-admin",
    name: "DashboardAdmin",
    component: DashboardAdmin,
  },
  {
    path: "/dashboard-businessowners",
    name: "DashboardBusinessOwners",
    component: DashboardBusinessOwners,
  },
  {
    path: "/dashboard-properties",
    name: "DashboardProperties",
    component: DashboardProperties,
  },
  {
    path: "/dashboard-analytics",
    name: "DashboardAnalytics",
    component: DashboardAnalytics,
  },
  {
    path: "/dashboard-transactions",
    name: "DashboardTransactions",
    component: DashboardTransactions,
  },
  {
    path: "/dashboard-support",
    name: "DashboardSupport",
    component: DashboardSupport,
  },
  {
    path: "/dashboard-settings",
    name: "DashboardSettings",
    component: DashboardSettings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
