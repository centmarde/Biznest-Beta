<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import {
  TypographyH2,
  TypographyP,
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/typography";
import { Search, Receipt } from "lucide-vue-next";
import type { Invoice, FilterOption } from "@/stores/billingData";

interface Props {
  paginatedInvoices: Invoice[];
  totalFilteredItems: number;
  currentPage: number;
  itemsPerPage: number;
  activeFilter: string;
  searchQuery: string;
  filterOptions: FilterOption[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:searchQuery": [value: string];
  "update:activeFilter": [value: "all" | "paid" | "pending" | "overdue"];
  "update:currentPage": [value: number];
}>();

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const formatStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);
</script>

<template>
  <div
    class="bg-card rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-200"
  >
    <!-- Table Header with Filters & Search -->
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b border-border gap-4"
    >
      <div class="space-y-1">
        <TypographyH2 class="text-lg font-semibold text-foreground">
          Invoice History
        </TypographyH2>
        <TypographyMuted class="text-xs">
          Manage all invoices and payment records
        </TypographyMuted>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <!-- Search -->
        <div class="relative">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <input
            :value="searchQuery"
            type="text"
            placeholder="Search invoices..."
            class="h-9 pl-9 pr-4 w-full sm:w-56 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-prof-gold/50 focus:border-prof-gold transition-all"
            @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <!-- Filter Buttons -->
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
            @click="emit('update:activeFilter', filter.id as 'all' | 'paid' | 'pending' | 'overdue')"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <Table>
      <TableHeader>
        <TableRow class="hover:bg-transparent border-border">
          <TableHead class="font-semibold">Invoice</TableHead>
          <TableHead class="font-semibold">Business Owner</TableHead>
          <TableHead class="font-semibold">Plan</TableHead>
          <TableHead class="font-semibold">Amount</TableHead>
          <TableHead class="font-semibold">Status</TableHead>
          <TableHead class="font-semibold">Due Date</TableHead>
          <TableHead class="font-semibold text-right pr-10">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="invoice in paginatedInvoices"
          :key="invoice.id"
          class="hover:bg-muted/50 transition-colors duration-150 cursor-pointer border-border"
        >
          <TableCell class="py-4">
            <TypographySmall class="font-mono font-semibold text-foreground">
              {{ invoice.id }}
            </TypographySmall>
          </TableCell>

          <TableCell class="py-4">
            <div class="flex items-center gap-3">
              <Avatar class="h-9 w-9 ring-2 ring-border">
                <AvatarFallback
                  :style="{ backgroundColor: invoice.avatarColor }"
                  class="text-background font-semibold text-xs"
                >
                  {{ invoice.initials }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <span class="font-semibold text-sm text-foreground">
                  {{ invoice.businessOwner }}
                </span>
                <span class="text-xs text-muted-foreground">
                  {{ invoice.businessName }}
                </span>
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Badge variant="secondary" class="font-semibold text-xs">
              {{ invoice.plan }}
            </Badge>
          </TableCell>

          <TableCell>
            <span class="font-bold text-foreground">
              {{ formatCurrency(invoice.amount) }}
            </span>
          </TableCell>

          <TableCell>
            <span
              class="px-3 py-1.5 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
              :class="{
                'bg-success/10 text-success dark:bg-success/20': invoice.status === 'paid',
                'bg-warning/10 text-warning dark:bg-warning/20': invoice.status === 'pending',
                'bg-destructive/10 text-destructive dark:bg-destructive/20': invoice.status === 'overdue',
              }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="{
                  'bg-success': invoice.status === 'paid',
                  'bg-warning': invoice.status === 'pending',
                  'bg-destructive': invoice.status === 'overdue',
                }"
              />
              {{ formatStatus(invoice.status) }}
            </span>
          </TableCell>

          <TableCell class="text-foreground text-sm">
            {{ formatDate(invoice.dueDate) }}
          </TableCell>

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
                v-if="invoice.status !== 'paid'"
                variant="default"
                size="sm"
                class="hover:scale-105 transition-transform duration-200"
              >
                Send Reminder
              </Button>
            </div>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="paginatedInvoices.length === 0">
          <TableCell :colspan="7" class="py-12 text-center">
            <div class="flex flex-col items-center gap-3">
              <Receipt class="h-10 w-10 text-muted-foreground/50" />
              <TypographyP class="text-muted-foreground text-sm">
                No invoices found matching your criteria.
              </TypographyP>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Pagination -->
    <div v-if="totalFilteredItems > 0" class="p-4 border-t border-border">
      <Pagination
        :current-page="currentPage"
        :total-items="totalFilteredItems"
        :items-per-page="itemsPerPage"
        @update:current-page="emit('update:currentPage', $event)"
      />
    </div>
  </div>
</template>
