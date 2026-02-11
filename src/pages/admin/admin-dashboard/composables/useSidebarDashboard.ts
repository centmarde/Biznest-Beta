import { ref, computed } from 'vue'

// Types
export interface BusinessOwner {
  id: string
  name: string
  email: string
  businessName: string
  properties: number
  status: 'active' | 'pending' | 'inactive'
  joinedDate: string
  avatarColor: string
  initials: string
}

export interface StatCard {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  iconType: 'users' | 'properties' | 'pending' | 'revenue'
  iconColorClass: string
}

export interface NavItem {
  id: string
  label: string
  icon: string
  active?: boolean
}

// Shared state (outside composable to be shared across all instances)
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

const navItems = ref<NavItem[]>([
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { id: 'businessowners', label: 'Business Owners', icon: 'users' },
  { id: 'properties', label: 'Properties', icon: 'building' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'transactions', label: 'Transactions', icon: 'transactions' },
  { id: 'support', label: 'Support', icon: 'support' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
])

const statCards = ref<StatCard[]>([
  {
    id: 'total-owners',
    label: 'Total Business Owners',
    value: '1,248',
    change: '↑ 12% from last month',
    changeType: 'positive',
    iconType: 'users',
    iconColorClass: 'blue',
  },
  {
    id: 'listed-properties',
    label: 'Listed Properties',
    value: '3,426',
    change: '↑ 8% from last month',
    changeType: 'positive',
    iconType: 'properties',
    iconColorClass: 'blue',
  },
  {
    id: 'pending-approvals',
    label: 'Pending Approvals',
    value: '156',
    change: '↓ 3% from last month',
    changeType: 'negative',
    iconType: 'pending',
    iconColorClass: 'orange',
  },
  {
    id: 'revenue',
    label: 'Revenue (Monthly)',
    value: '$284K',
    change: '↑ 18% from last month',
    changeType: 'positive',
    iconType: 'revenue',
    iconColorClass: 'green',
  },
])

const businessOwners = ref<BusinessOwner[]>([
  {
    id: '1',
    name: 'John Dela Cruz',
    email: 'john.dc@email.com',
    businessName: 'Urban Spaces PH',
    properties: 12,
    status: 'active',
    joinedDate: 'Jan 15, 2026',
    avatarColor: '#1e3a5f',
    initials: 'JD',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.r@email.com',
    businessName: 'Metro Retail Corp',
    properties: 8,
    status: 'pending',
    joinedDate: 'Feb 02, 2026',
    avatarColor: '#3b82f6',
    initials: 'MR',
  },
  {
    id: '3',
    name: 'Antonio Lopez',
    email: 'antonio.l@email.com',
    businessName: 'Prime Properties',
    properties: 15,
    status: 'active',
    joinedDate: 'Dec 28, 2025',
    avatarColor: '#1e3a5f',
    initials: 'AL',
  },
  {
    id: '4',
    name: 'Sofia Santos',
    email: 'sofia.s@email.com',
    businessName: 'Venture Spaces Inc',
    properties: 6,
    status: 'active',
    joinedDate: 'Jan 22, 2026',
    avatarColor: '#8b5cf6',
    initials: 'SS',
  },
  {
    id: '5',
    name: 'Ramon Cruz',
    email: 'ramon.c@email.com',
    businessName: 'Business Hub Co',
    properties: 3,
    status: 'inactive',
    joinedDate: 'Nov 10, 2025',
    avatarColor: '#6b7280',
    initials: 'RC',
  },
])

const activeFilter = ref<'all' | 'active' | 'pending' | 'inactive'>('all')
const searchQuery = ref('')

// Composable
export function useSidebarDashboard() {

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
          owner.businessName.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  // Methods
  const setFilter = (filter: 'all' | 'active' | 'pending' | 'inactive') => {
    activeFilter.value = filter
  }

  const setActiveNavItem = (id: string) => {
    navItems.value = navItems.value.map((item) => ({
      ...item,
      active: item.id === id,
    }))
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
    // State
    navItems,
    statCards,
    businessOwners,
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
