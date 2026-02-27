<script setup lang="ts">
import { useSidebarDashboard } from "@/pages/AdminPage/composables/useAdminDashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TypographyP,
  TypographyH1,
  TypographyH2,
} from "@/components/ui/typography";
import { Users, Building2, Clock, CircleDollarSign } from "lucide-vue-next";

const {
  statCards,
  activeFilter,
  filterOptions,
  filteredBusinessOwners,
  setFilter,
  formatStatus,
} = useSidebarDashboard();
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-2">
      <TypographyH1 class="text-2xl md:text-3xl font-bold text-foreground"
        >Dashboard Overview</TypographyH1
      >
      <TypographyP class="text-muted-foreground"
        >Welcome back! Here's what's happening with your platform
        today.</TypographyP
      >
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div
        v-for="stat in statCards"
        :key="stat.id"
        class="bg-card rounded-xl border border-border p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
      >
        <div class="space-y-1">
          <div class="text-3xl font-bold text-foreground">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
          <div
            class="text-xs font-semibold flex items-center gap-1"
            :class="
              stat.changeType === 'positive'
                ? 'text-success'
                : 'text-destructive'
            "
          >
            {{ stat.change }}
          </div>
        </div>
        <div
          class="h-14 w-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          :class="stat.iconColorClass"
        >
          <Users v-if="stat.iconType === 'users'" class="h-7 w-7" />
          <Building2
            v-else-if="stat.iconType === 'properties'"
            class="h-7 w-7"
          />
          <Clock v-else-if="stat.iconType === 'pending'" class="h-7 w-7" />
          <CircleDollarSign
            v-else-if="stat.iconType === 'revenue'"
            class="h-7 w-7"
          />
        </div>
      </div>
    </div>

    <!-- Business Owners Table -->
    <div
      class="bg-card rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-border gap-3"
      >
        <div class="space-y-1">
          <TypographyH2 class="text-lg font-semibold text-foreground"
            >Recent Business Owners</TypographyH2
          >
          <TypographyH2 class="text-xs text-muted-foreground"
            >Monitor and manage business owner accounts</TypographyH2
          >
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="filter in filterOptions"
            :key="filter.id"
            class="px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105"
            :class="
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background text-muted-foreground border-border hover:bg-muted hover:border-muted-foreground/20'
            "
            @click="
              setFilter(filter.id as 'all' | 'active' | 'pending' | 'inactive')
            "
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent border-border">
            <TableHead class="font-semibold">Business Owner</TableHead>
            <TableHead class="font-semibold">Business Name</TableHead>
            <TableHead class="font-semibold">Properties</TableHead>
            <TableHead class="font-semibold">Status</TableHead>
            <TableHead class="font-semibold">Joined Date</TableHead>
            <TableHead class="font-semibold text-right pr-10"
              >Actions</TableHead
            >
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="owner in filteredBusinessOwners"
            :key="owner.id"
            class="hover:bg-muted/50 transition-colors duration-150 cursor-pointer border-border"
          >
            <TableCell class="py-4">
              <div class="flex items-center gap-3">
                <Avatar class="h-10 w-10 ring-2 ring-border">
                  <AvatarFallback
                    :style="{ backgroundColor: owner.avatarColor }"
                    class="text-background font-semibold text-sm"
                  >
                    {{ owner.initials }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <span class="font-semibold text-foreground">{{
                    owner.name
                  }}</span>
                  <span class="text-s text-muted-foreground">{{
                    owner.email
                  }}</span>
                </div>
              </div>
            </TableCell>
            <TableCell class="font-medium text-foreground">{{
              owner.businessName
            }}</TableCell>
            <TableCell>
              <span
                class="px-2.5 py-1 bg-card-foreground text-background text-xs font-semibold rounded-md"
              >
                {{ owner.properties }}
              </span>
            </TableCell>
            <TableCell>
              <span
                class="px-3 py-1.5 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
                :class="{
                  'bg-success/10 text-success dark:bg-success/20':
                    owner.status === 'active',
                  'bg-warning/10 text-warning dark:bg-warning/20':
                    owner.status === 'pending',
                  'bg-destructive/10 text-destructive dark:bg-destructive/20':
                    owner.status === 'inactive',
                }"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="{
                    'bg-success': owner.status === 'active',
                    'bg-warning': owner.status === 'pending',
                    'bg-destructive': owner.status === 'inactive',
                  }"
                ></span>
                {{ formatStatus(owner.status) }}
              </span>
            </TableCell>
            <TableCell class="text-foreground">{{
              owner.joinedDate
            }}</TableCell>
            <TableCell class="text-right">
              <div class="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  class="hover:scale-105 transition-transform duration-200"
                >
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  class="hover:scale-105 transition-transform duration-200"
                >
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
