<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSidebarDashboard } from '@/pages/admin/admin-dashboard/composables/useSidebarDashboard'

const router = useRouter()
const route = useRoute()
const { navItems, setActiveNavItem, sidebarOpen, closeSidebar } = useSidebarDashboard()
const sidebarRef = ref<HTMLElement | null>(null)

const routeMap: Record<string, string> = {
  dashboard: '/dashboard-admin',
  businessowners: '/dashboard-businessowners',
  properties: '/dashboard-properties',
  analytics: '/dashboard-analytics',
  transactions: '/dashboard-transactions',
  support: '/dashboard-support',
  settings: '/dashboard-settings',
}

// Function to get nav item id from route path
const getNavItemFromRoute = (path: string): string => {
  const reverseRouteMap: Record<string, string> = Object.entries(routeMap).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {}
  )
  return reverseRouteMap[path] || 'dashboard'
}

// Update active nav item based on current route
const updateActiveFromRoute = () => {
  const currentNavItemId = getNavItemFromRoute(route.path)
  setActiveNavItem(currentNavItemId)
}

// Watch for route changes
watch(() => route.path, () => {
  updateActiveFromRoute()
}, { immediate: true })

// Set active on mount
onMounted(() => {
  updateActiveFromRoute()
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  if (window.innerWidth <= 768 && sidebarOpen.value && sidebarRef.value) {
    const target = event.target as Node
    // Ignore clicks on the sidebar itself or the hamburger menu button
    const menuBtn = document.querySelector('.admin-header-menu-btn')
    if (!sidebarRef.value.contains(target) && !menuBtn?.contains(target)) {
      closeSidebar()
    }
  }
}

const handleNavClick = (item: any) => {
  const path = routeMap[item.id]
  if (path) {
    router.push(path)
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      closeSidebar()
    }
  }
}
</script>

<template>
  <aside ref="sidebarRef" class="admin-sidebar" :class="{ 'collapsed': !sidebarOpen }">
    <div class="admin-sidebar-logo">
      <div class="admin-sidebar-logo-icon">B</div>
      <span class="admin-sidebar-logo-text">Biznest</span>
    </div>

    <nav class="admin-sidebar-nav">
      <div
        v-for="item in navItems"
        :key="item.id"
        class="admin-sidebar-nav-item"
        :class="{ active: item.active }"
        @click="handleNavClick(item)"
      >
        <!-- Dashboard Icon -->
        <svg v-if="item.icon === 'dashboard'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <!-- Users Icon -->
        <svg v-else-if="item.icon === 'users'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <!-- Building Icon -->
        <svg v-else-if="item.icon === 'building'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <!-- Analytics Icon -->
        <svg v-else-if="item.icon === 'analytics'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <!-- Transactions Icon -->
        <svg v-else-if="item.icon === 'transactions'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <!-- Support Icon -->
        <svg v-else-if="item.icon === 'support'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <!-- Settings Icon -->
        <svg v-else-if="item.icon === 'settings'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ item.label }}</span>
      </div>
    </nav>
  </aside>
  <!-- Backdrop overlay for mobile -->
  <div
    v-if="sidebarOpen"
    class="admin-sidebar-overlay"
    @click="closeSidebar"
  />
</template>