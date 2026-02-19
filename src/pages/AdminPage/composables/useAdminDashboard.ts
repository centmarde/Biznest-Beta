import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboardData'
import type { BusinessOwner } from '@/stores/dashboardData'

// Re-export types so existing imports keep working
export type { BusinessOwner, StatCard, NavItem } from '@/stores/dashboardData'

// Shared UI state (outside composable to be shared across all instances)
const MOBILE_BREAKPOINT = 768
const sidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth > MOBILE_BREAKPOINT : true)

// Auto-close sidebar when resizing to mobile
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      sidebarOpen.value = false
    }
  })
}

const activeFilter = ref<'all' | 'active' | 'pending' | 'inactive'>('all')
const searchQuery = ref('')

// Composable
export function useSidebarDashboard() {
  const dashboardStore = useDashboardStore()
  const { navItems, statCards, businessOwners, loading, error } = storeToRefs(dashboardStore)

  // Fetch data on first use
  onMounted(() => {
    if (businessOwners.value.length === 0 && !loading.value) {
      dashboardStore.fetchDashboardData()
    }
  })

  // Filter Options
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'inactive', label: 'Inactive' },
  ]

  // Computed Filtered Business Owners
  const filteredBusinessOwners = computed(() => {
    let filtered = businessOwners.value

    // Filter by status
    if (activeFilter.value !== 'all') {
      filtered = filtered.filter((owner) => owner.status === activeFilter.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (owner) =>
          owner.name.toLowerCase().includes(query) ||
          owner.email.toLowerCase().includes(query) ||
          owner.businessName.toLowerCase().includes(query),
      )
    }

    return filtered
  })

  // Methods
  const setFilter = (filter: 'all' | 'active' | 'pending' | 'inactive') => {
    activeFilter.value = filter
  }

  const setActiveNavItem = (id: string) => {
    dashboardStore.setActiveNavItem(id)
  }

  const getStatusClass = (status: BusinessOwner['status']) => {
    const classes: Record<BusinessOwner['status'], string> = {
      active: 'status-badge active',
      pending: 'status-badge pending',
      inactive: 'status-badge inactive',
    }
    return classes[status]
  }

  const formatStatus = (status: BusinessOwner['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  return {
    // State (from Pinia store)
    navItems,
    statCards,
    businessOwners,
    loading,
    error,

    // Local UI State
    activeFilter,
    searchQuery,
    filterOptions,
    sidebarOpen,

    // Computed
    filteredBusinessOwners,

    // Methods
    setFilter,
    setActiveNavItem,
    getStatusClass,
    formatStatus,
    toggleSidebar,
    closeSidebar,
  }
}