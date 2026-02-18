import { defineStore } from 'pinia'
import axios from 'axios'
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

export interface DashboardResponse {
  navItems: NavItem[]
  statCards: StatCard[]
  businessOwners: BusinessOwner[]
}

export const useDashboardStore = defineStore('dashboardAdminData', () => {
  // State
  const navItems = ref<NavItem[]>([])
  const statCards = ref<StatCard[]>([])
  const businessOwners = ref<BusinessOwner[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const totalBusinessOwners = computed(() => businessOwners.value.length)

  const activeBusinessOwners = computed(() =>
    businessOwners.value.filter((owner) => owner.status === 'active'),
  )

  const pendingBusinessOwners = computed(() =>
    businessOwners.value.filter((owner) => owner.status === 'pending'),
  )

  const inactiveBusinessOwners = computed(() =>
    businessOwners.value.filter((owner) => owner.status === 'inactive'),
  )

  const activeNavItem = computed(() =>
    navItems.value.find((item) => item.active),
  )

  // Actions
  const fetchDashboardData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<DashboardResponse>('/data/dashboard.json')
      navItems.value = response.data.navItems
      statCards.value = response.data.statCards
      businessOwners.value = response.data.businessOwners
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
      console.error('Error fetching dashboard data:', err)
    } finally {
      loading.value = false
    }
  }

  const setActiveNavItem = (id: string) => {
    navItems.value = navItems.value.map((item) => ({
      ...item,
      active: item.id === id,
    }))
  }

  return {
    // State
    navItems,
    statCards,
    businessOwners,
    loading,
    error,

    // Getters
    totalBusinessOwners,
    activeBusinessOwners,
    pendingBusinessOwners,
    inactiveBusinessOwners,
    activeNavItem,

    // Actions
    fetchDashboardData,
    setActiveNavItem,
  }
})
