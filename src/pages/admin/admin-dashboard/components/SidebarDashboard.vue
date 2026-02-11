<script setup lang="ts">
import OuterLayout from '@/layout/OuterLayout.vue';
import { useSidebarDashboard } from '@/pages/admin/admin-dashboard/composables/useSidebarDashboard'
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import AdminHeader from '@/pages/admin/AdminHeader.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import '../admin.css'
import { TypographyP, TypographyH1, TypographyH2} from '@/components/ui/typography'

const {
  statCards,
  activeFilter,
  filterOptions,
  filteredBusinessOwners,
  setFilter,
  getStatusClass,
  formatStatus,
} = useSidebarDashboard()
</script>

<template>
  <OuterLayout>
    <template #content>
          <div class="admin-layout">
            <!-- Sidebar -->
            <AdminSidebar />

            <!-- Main Content Wrapper -->
            <div class="admin-content-wrapper">
              <!-- Header -->
              <AdminHeader />

              <!-- Main Content -->
              <main class="admin-main">
                <TypographyH1 class="admin-dashboard-title">Dashboard Overview</TypographyH1>
                <TypographyP class="admin-dashboard-subtitle">Welcome back! Here's what's happening with your platform today.</TypographyP>

                <!-- Stat Cards -->
                <div class="admin-stats-grid">
                  <div
                    v-for="stat in statCards"
                    :key="stat.id"
                    class="admin-stat-card"
                  >
                    <div>
                      <div class="admin-stat-value">{{ stat.value }}</div>
                      <div class="admin-stat-label">{{ stat.label }}</div>
                      <div
                        class="admin-stat-change"
                        :class="stat.changeType"
                      >
                        {{ stat.change }}
                      </div>
                    </div>
                    <div class="admin-stat-icon" :class="stat.iconColorClass">
                      <!-- Users Icon -->
                      <svg v-if="stat.iconType === 'users'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <!-- Properties Icon -->
                      <svg v-else-if="stat.iconType === 'properties'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <!-- Pending Icon -->
                      <svg v-else-if="stat.iconType === 'pending'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <!-- Revenue Icon -->
                      <svg v-else-if="stat.iconType === 'revenue'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Business Owners Table -->
                <div class="admin-table-section">
                  <div class="admin-table-header">
                    <TypographyH2 class="admin-table-title">Recent Business Owners</TypographyH2>
                    <div class="admin-table-filters">
                      <button
                        v-for="filter in filterOptions"
                        :key="filter.id"
                        class="admin-filter-btn"
                        :class="{ active: activeFilter === filter.id }"
                        @click="setFilter(filter.id as 'all' | 'active' | 'pending' | 'inactive')"
                      >
                        {{ filter.label }}
                      </button>
                    </div>
                  </div>

                  <Table class="admin-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Owner</TableHead>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Properties</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-for="owner in filteredBusinessOwners"
                        :key="owner.id"
                      >
                        <TableCell>
                          <div class="admin-table-user">
                            <Avatar class="h-10 w-10">
                              <AvatarFallback
                                :style="{ backgroundColor: owner.avatarColor }"
                                class="text-white font-semibold text-sm"
                              >
                                {{ owner.initials }}
                              </AvatarFallback>
                            </Avatar>
                            <div class="admin-table-user-info">
                              <span class="admin-table-user-name">{{ owner.name }}</span>
                              <span class="admin-table-user-email">{{ owner.email }}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{{ owner.businessName }}</TableCell>
                        <TableCell>{{ owner.properties }}</TableCell>
                        <TableCell>
                          <span :class="getStatusClass(owner.status)">
                            {{ formatStatus(owner.status) }}
                          </span>
                        </TableCell>
                        <TableCell>{{ owner.joinedDate }}</TableCell>
                        <TableCell>
                          <div class="flex gap-2">
                            <Button variant="secondary" size="sm" class="admin-action-btn view">
                              View
                            </Button>
                            <Button variant="default" size="sm" class="admin-action-btn edit">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </main>
            </div>
          </div>
    </template>
  </OuterLayout>
</template>
