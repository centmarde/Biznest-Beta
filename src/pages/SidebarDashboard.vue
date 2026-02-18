<script setup lang="ts">
import { useSidebarDashboard } from '@/pages/admin/admin-dashboard/composables/useSidebarDashboard'
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
import { TypographyP, TypographyH1, TypographyH2} from '@/components/ui/typography'
import { Users, Building2, Clock, CircleDollarSign } from 'lucide-vue-next'

const {
  statCards,
  activeFilter,
  filterOptions,
  filteredBusinessOwners,
  setFilter,
  formatStatus,
} = useSidebarDashboard()
</script>

<template>
  <div>
    <TypographyH1 class="text-2xl md:text-3xl font-bold text-foreground mb-1">Dashboard Overview</TypographyH1>
    <TypographyP class="text-muted-foreground mb-6">Welcome back! Here's what's happening with your platform today.</TypographyP>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="stat in statCards"
        :key="stat.id"
        class="bg-card rounded-xl border border-border p-5 flex items-center justify-between shadow-sm"
      >
        <div>
          <div class="text-2xl font-bold text-foreground">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground mt-1">{{ stat.label }}</div>
          <div
            class="text-xs mt-1 font-medium"
            :class="stat.changeType === 'positive' ? 'text-green-600' : 'text-red-500'"
          >
            {{ stat.change }}
          </div>
        </div>
        <div
          class="h-12 w-12 rounded-full flex items-center justify-center"
          :class="stat.iconColorClass"
        >
          <Users v-if="stat.iconType === 'users'" class="h-6 w-6" />
          <Building2 v-else-if="stat.iconType === 'properties'" class="h-6 w-6" />
          <Clock v-else-if="stat.iconType === 'pending'" class="h-6 w-6" />
          <CircleDollarSign v-else-if="stat.iconType === 'revenue'" class="h-6 w-6" />
        </div>
      </div>
    </div>

    <!-- Business Owners Table -->
    <div class="bg-card rounded-xl border border-border shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-b border-border gap-3">
        <TypographyH2 class="text-lg font-semibold text-foreground">Recent Business Owners</TypographyH2>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="filter in filterOptions"
            :key="filter.id"
            class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
            :class="activeFilter === filter.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:bg-muted'"
            @click="setFilter(filter.id as 'all' | 'active' | 'pending' | 'inactive')"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <Table>
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
              <div class="flex items-center gap-3">
                <Avatar class="h-10 w-10">
                  <AvatarFallback
                    :style="{ backgroundColor: owner.avatarColor }"
                    class="text-white font-semibold text-sm"
                  >
                    {{ owner.initials }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <span class="font-medium text-foreground">{{ owner.name }}</span>
                  <span class="text-xs text-muted-foreground">{{ owner.email }}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{{ owner.businessName }}</TableCell>
            <TableCell>{{ owner.properties }}</TableCell>
            <TableCell>
              <span
                class="px-2.5 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': owner.status === 'active',
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': owner.status === 'pending',
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': owner.status === 'inactive',
                }"
              >
                {{ formatStatus(owner.status) }}
              </span>
            </TableCell>
            <TableCell>{{ owner.joinedDate }}</TableCell>
            <TableCell>
              <div class="flex gap-2">
                <Button variant="secondary" size="sm">
                  View
                </Button>
                <Button variant="default" size="sm">
                  Edit
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
