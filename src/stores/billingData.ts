import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

// Types
export interface BillingStat {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  iconType: 'revenue' | 'pending' | 'paid' | 'overdue'
}

export interface Invoice {
  id: string
  businessOwner: string
  businessName: string
  email: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  paidDate: string | null
  plan: string
  initials: string
  avatarColor: string
}

export interface Plan {
  id: string
  name: string
  price: number
  billingCycle: string
  features: string[]
}

export interface RevenueEntry {
  month: string
  revenue: number
}

export interface BillingResponse {
  billingStats: BillingStat[]
  invoices: Invoice[]
  plans: Plan[]
  revenueHistory: RevenueEntry[]
}

export const useBillingStore = defineStore('billingData', () => {
  // State
  const billingStats = ref<BillingStat[]>([])
  const invoices = ref<Invoice[]>([])
  const plans = ref<Plan[]>([])
  const revenueHistory = ref<RevenueEntry[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const activeFilter = ref<'all' | 'paid' | 'pending' | 'overdue'>('all')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(4)

  // Getters
  const totalInvoices = computed(() => invoices.value.length)

  const paidInvoices = computed(() =>
    invoices.value.filter((inv) => inv.status === 'paid'),
  )

  const pendingInvoices = computed(() =>
    invoices.value.filter((inv) => inv.status === 'pending'),
  )

  const overdueInvoices = computed(() =>
    invoices.value.filter((inv) => inv.status === 'overdue'),
  )

  const totalRevenue = computed(() =>
    paidInvoices.value.reduce((sum, inv) => sum + inv.amount, 0),
  )

  const filteredInvoices = computed(() => {
    let result = invoices.value

    if (activeFilter.value !== 'all') {
      result = result.filter((inv) => inv.status === activeFilter.value)
    }

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (inv) =>
          inv.businessOwner.toLowerCase().includes(query) ||
          inv.businessName.toLowerCase().includes(query) ||
          inv.id.toLowerCase().includes(query) ||
          inv.email.toLowerCase().includes(query),
      )
    }

    return result
  })

  const paginatedInvoices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredInvoices.value.slice(start, end)
  })

  const totalFilteredItems = computed(() => filteredInvoices.value.length)

  const latestRevenueEntry = computed(() =>
    revenueHistory.value.length > 0
      ? revenueHistory.value[revenueHistory.value.length - 1]
      : null,
  )

  // Actions
  const fetchBillingData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<BillingResponse>('/data/billing.json')
      billingStats.value = response.data.billingStats
      invoices.value = response.data.invoices
      plans.value = response.data.plans
      revenueHistory.value = response.data.revenueHistory
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch billing data'
      console.error('Error fetching billing data:', err)
    } finally {
      loading.value = false
    }
  }

  const setFilter = (filter: 'all' | 'paid' | 'pending' | 'overdue') => {
    activeFilter.value = filter
    currentPage.value = 1 // Reset to first page when filter changes
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return {
    // State
    billingStats,
    invoices,
    plans,
    revenueHistory,
    loading,
    error,
    activeFilter,
    searchQuery,
    currentPage,
    itemsPerPage,

    // Getters
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalRevenue,
    filteredInvoices,
    paginatedInvoices,
    totalFilteredItems,
    latestRevenueEntry,

    // Actions
    fetchBillingData,
    setFilter,
    setSearchQuery,
    setCurrentPage,
    formatCurrency,
    formatDate,
  }
})
