import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBillingStore } from '@/stores/billingData'

// Re-export types for convenience
export type { BillingStat, Invoice, Plan, RevenueEntry } from '@/stores/billingData'

export function useAdminBilling() {
  const billingStore = useBillingStore()

  const {
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
    filteredInvoices,
    paginatedInvoices,
    totalFilteredItems,
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalRevenue,
    latestRevenueEntry,
  } = storeToRefs(billingStore)

  // Fetch data on first use
  onMounted(() => {
    if (invoices.value.length === 0 && !loading.value) {
      billingStore.fetchBillingData()
    }
  })

  // Filter Options
  const filterOptions = [
    { id: 'all', label: 'All Invoices' },
    { id: 'paid', label: 'Paid' },
    { id: 'pending', label: 'Pending' },
    { id: 'overdue', label: 'Overdue' },
  ]

  const setFilter = (filter: 'all' | 'paid' | 'pending' | 'overdue') => {
    billingStore.setFilter(filter)
  }

  const setSearchQuery = (query: string) => {
    billingStore.setSearchQuery(query)
  }

  const setCurrentPage = (page: number) => {
    billingStore.setCurrentPage(page)
  }

  const formatCurrency = (amount: number): string => {
    return billingStore.formatCurrency(amount)
  }

  const formatDate = (dateStr: string): string => {
    return billingStore.formatDate(dateStr)
  }

  const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getRevenueBarHeight = (revenue: number): string => {
    const maxRevenue = Math.max(...revenueHistory.value.map((e) => e.revenue))
    if (maxRevenue === 0) return '0%'
    return `${(revenue / maxRevenue) * 100}%`
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
    filteredInvoices,
    paginatedInvoices,
    totalFilteredItems,
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalRevenue,
    latestRevenueEntry,

    // Config
    filterOptions,

    // Methods
    setFilter,
    setSearchQuery,
    setCurrentPage,
    formatCurrency,
    formatDate,
    formatStatus,
    getRevenueBarHeight,
  }
}
