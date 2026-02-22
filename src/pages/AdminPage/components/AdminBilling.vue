<script setup lang="ts">
import { useAdminBilling } from "@/pages/AdminPage/composables/useAdminBilling";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/typography";
import {
  CircleDollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Download,
  TrendingUp,
  Receipt,
  CreditCard,
  Sparkles,
  Check,
} from "lucide-vue-next";

const {
  billingStats,
  plans,
  revenueHistory,
  loading,
  activeFilter,
  searchQuery,
  currentPage,
  itemsPerPage,
  paginatedInvoices,
  totalFilteredItems,
  filterOptions,
  setFilter,
  setSearchQuery,
  setCurrentPage,
  formatCurrency,
  formatDate,
  formatStatus,
  getRevenueBarHeight,
} = useAdminBilling();
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
    >
      <div class="space-y-2">
        <TypographyH1 class="text-2xl md:text-3xl font-bold text-foreground">
          Billing & Invoices
        </TypographyH1>
        <TypographyP class="text-muted-foreground">
          Track revenue, manage invoices, and monitor subscription plans.
        </TypographyP>
      </div>
      <div class="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          class="hover:scale-105 transition-transform duration-200 gap-2"
        >
          <Download class="h-4 w-4" />
          Export CSV
        </Button>
        <Button
          variant="default"
          size="sm"
          class="hover:scale-105 transition-transform duration-200 gap-2"
        >
          <Receipt class="h-4 w-4" />
          New Invoice
        </Button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-20"
    >
      <div
        class="h-8 w-8 animate-spin rounded-full border-4 border-prof-gold border-t-transparent"
      />
    </div>

    <template v-else>
      <!-- Stat Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <div
          v-for="stat in billingStats"
          :key="stat.id"
          class="bg-card rounded-xl border border-border p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
        >
          <div class="space-y-1">
            <div class="text-3xl font-bold text-foreground">
              {{ stat.value }}
            </div>
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
            :class="{
              'bg-success/10 text-success': stat.iconType === 'revenue',
              'bg-warning/10 text-warning': stat.iconType === 'pending',
              'bg-prof-lightblue text-prof-navy dark:bg-prof-navy/30 dark:text-prof-gold':
                stat.iconType === 'paid',
              'bg-destructive/10 text-destructive': stat.iconType === 'overdue',
            }"
          >
            <CircleDollarSign
              v-if="stat.iconType === 'revenue'"
              class="h-7 w-7"
            />
            <Clock v-else-if="stat.iconType === 'pending'" class="h-7 w-7" />
            <CheckCircle2
              v-else-if="stat.iconType === 'paid'"
              class="h-7 w-7"
            />
            <AlertTriangle
              v-else-if="stat.iconType === 'overdue'"
              class="h-7 w-7"
            />
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <Tabs default-value="invoices" class="space-y-4">
        <TabsList
          class="admin-tabs-list bg-card border border-border rounded-lg p-1 inline-flex gap-1"
        >
          <TabsTrigger
            value="invoices"
            class="rounded-md px-4 py-2 text-sm font-semibold transition-all"
          >
            <Receipt class="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            class="rounded-md px-4 py-2 text-sm font-semibold transition-all"
          >
            <TrendingUp class="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            class="rounded-md px-4 py-2 text-sm font-semibold transition-all"
          >
            <CreditCard class="h-4 w-4 mr-2" />
            Plans
          </TabsTrigger>
        </TabsList>

        <!-- ============ INVOICES TAB ============ -->
        <TabsContent value="invoices">
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
                    @input="
                      setSearchQuery(
                        ($event.target as HTMLInputElement).value,
                      )
                    "
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
                    @click="
                      setFilter(
                        filter.id as 'all' | 'paid' | 'pending' | 'overdue',
                      )
                    "
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
                  <TableHead class="font-semibold text-right pr-10">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="invoice in paginatedInvoices"
                  :key="invoice.id"
                  class="hover:bg-muted/50 transition-colors duration-150 cursor-pointer border-border"
                >
                    <!-- Invoice ID -->
                    <TableCell class="py-4">
                      <TypographySmall
                        class="font-mono font-semibold text-foreground"
                      >
                        {{ invoice.id }}
                      </TypographySmall>
                    </TableCell>

                    <!-- Business Owner -->
                    <TableCell class="py-4">
                      <div class="flex items-center gap-3">
                        <Avatar class="h-9 w-9 ring-2 ring-border">
                          <AvatarFallback
                            :style="{
                              backgroundColor: invoice.avatarColor,
                            }"
                            class="text-background font-semibold text-xs"
                          >
                            {{ invoice.initials }}
                          </AvatarFallback>
                        </Avatar>
                        <div class="flex flex-col">
                          <span
                            class="font-semibold text-sm text-foreground"
                          >
                            {{ invoice.businessOwner }}
                          </span>
                          <span
                            class="text-xs text-muted-foreground"
                          >
                            {{ invoice.businessName }}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <!-- Plan -->
                    <TableCell>
                      <Badge variant="secondary" class="font-semibold text-xs">
                        {{ invoice.plan }}
                      </Badge>
                    </TableCell>

                    <!-- Amount -->
                    <TableCell>
                      <span class="font-bold text-foreground">
                        {{ formatCurrency(invoice.amount) }}
                      </span>
                    </TableCell>

                    <!-- Status -->
                    <TableCell>
                      <span
                        class="px-3 py-1.5 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
                        :class="{
                          'bg-success/10 text-success dark:bg-success/20':
                            invoice.status === 'paid',
                          'bg-warning/10 text-warning dark:bg-warning/20':
                            invoice.status === 'pending',
                          'bg-destructive/10 text-destructive dark:bg-destructive/20':
                            invoice.status === 'overdue',
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

                    <!-- Due Date -->
                    <TableCell class="text-foreground text-sm">
                      {{ formatDate(invoice.dueDate) }}
                    </TableCell>

                    <!-- Actions -->
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
                        <Receipt
                          class="h-10 w-10 text-muted-foreground/50"
                        />
                        <TypographyP class="text-muted-foreground text-sm">
                          No invoices found matching your criteria.
                        </TypographyP>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

            <!-- Pagination -->
            <div
              v-if="totalFilteredItems > 0"
              class="p-4 border-t border-border"
            >
              <Pagination
                :current-page="currentPage"
                :total-items="totalFilteredItems"
                :items-per-page="itemsPerPage"
                @update:current-page="setCurrentPage"
              />
            </div>
          </div>
        </TabsContent>

        <!-- ============ REVENUE TAB ============ -->
        <TabsContent value="revenue">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Revenue Chart Card -->
            <Card
              class="lg:col-span-2 border-border shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle class="text-lg font-semibold text-foreground">
                  Revenue Trend
                </CardTitle>
                <CardDescription>
                  Monthly revenue over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <!-- Simple Bar Chart -->
                <div class="flex items-end justify-between gap-3 h-56 px-2">
                  <div
                    v-for="entry in revenueHistory"
                    :key="entry.month"
                    class="flex flex-col items-center gap-2 flex-1"
                  >
                    <TypographySmall
                      class="text-xs font-semibold text-foreground"
                    >
                      {{ formatCurrency(entry.revenue) }}
                    </TypographySmall>
                    <div
                      class="w-full rounded-t-lg bg-prof-gold/80 dark:bg-prof-gold/60 hover:bg-prof-gold transition-all duration-300 min-h-[8px]"
                      :style="{ height: getRevenueBarHeight(entry.revenue) }"
                    />
                    <TypographySmall
                      class="text-xs text-muted-foreground whitespace-nowrap"
                    >
                      {{ entry.month }}
                    </TypographySmall>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Revenue Highlights Card -->
            <Card
              class="border-border shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle class="text-lg font-semibold text-foreground">
                  Highlights
                </CardTitle>
                <CardDescription>
                  Key billing metrics at a glance
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-5">
                <!-- Highlight Items -->
                <div
                  class="flex items-center gap-4 p-3 rounded-lg bg-success/5 border border-success/20"
                >
                  <div
                    class="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center"
                  >
                    <TrendingUp class="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <TypographySmall
                      class="font-semibold text-foreground text-sm"
                    >
                      Revenue Growth
                    </TypographySmall>
                    <TypographyMuted class="text-xs">
                      +14% compared to last month
                    </TypographyMuted>
                  </div>
                </div>

                <div
                  class="flex items-center gap-4 p-3 rounded-lg bg-prof-lightblue/50 border border-prof-navy/10 dark:bg-prof-navy/20 dark:border-prof-gold/20"
                >
                  <div
                    class="h-10 w-10 rounded-lg bg-prof-lightblue dark:bg-prof-navy/30 flex items-center justify-center"
                  >
                    <CheckCircle2
                      class="h-5 w-5 text-prof-navy dark:text-prof-gold"
                    />
                  </div>
                  <div>
                    <TypographySmall
                      class="font-semibold text-foreground text-sm"
                    >
                      Collection Rate
                    </TypographySmall>
                    <TypographyMuted class="text-xs">
                      94.2% invoices collected on time
                    </TypographyMuted>
                  </div>
                </div>

                <div
                  class="flex items-center gap-4 p-3 rounded-lg bg-warning/5 border border-warning/20"
                >
                  <div
                    class="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center"
                  >
                    <AlertTriangle class="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <TypographySmall
                      class="font-semibold text-foreground text-sm"
                    >
                      Overdue Amount
                    </TypographySmall>
                    <TypographyMuted class="text-xs">
                      $1,500 across 8 invoices
                    </TypographyMuted>
                  </div>
                </div>

                <div
                  class="flex items-center gap-4 p-3 rounded-lg bg-prof-gold/5 border border-prof-gold/20"
                >
                  <div
                    class="h-10 w-10 rounded-lg bg-prof-gold/10 flex items-center justify-center"
                  >
                    <Sparkles class="h-5 w-5 text-prof-gold" />
                  </div>
                  <div>
                    <TypographySmall
                      class="font-semibold text-foreground text-sm"
                    >
                      Top Plan
                    </TypographySmall>
                    <TypographyMuted class="text-xs">
                      Enterprise — 52% of revenue
                    </TypographyMuted>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- ============ PLANS TAB ============ -->
        <TabsContent value="plans">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              v-for="(plan, index) in plans"
              :key="plan.id"
              class="border-border shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
              :class="{
                'ring-2 ring-prof-gold': index === 1,
              }"
            >
              <!-- Popular Badge -->
              <div
                v-if="index === 1"
                class="absolute top-0 right-0 bg-prof-gold text-prof-navy text-xs font-bold px-3 py-1 rounded-bl-lg"
              >
                Popular
              </div>

              <CardHeader class="pb-4">
                <CardTitle class="text-lg font-bold text-foreground">
                  {{ plan.name }}
                </CardTitle>
                <CardDescription>
                  Best for
                  {{
                    plan.id === "starter"
                      ? "small businesses"
                      : plan.id === "professional"
                        ? "growing businesses"
                        : "large enterprises"
                  }}
                </CardDescription>
                <div class="pt-4">
                  <span class="text-4xl font-bold text-foreground">
                    {{ formatCurrency(plan.price) }}
                  </span>
                  <span class="text-sm text-muted-foreground">
                    /{{ plan.billingCycle }}
                  </span>
                </div>
              </CardHeader>

              <CardContent class="space-y-4">
                <div class="space-y-3">
                  <div
                    v-for="feature in plan.features"
                    :key="feature"
                    class="flex items-center gap-3"
                  >
                    <div
                      class="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                      :class="
                        index === 1
                          ? 'bg-prof-gold/20 text-prof-gold'
                          : 'bg-success/10 text-success'
                      "
                    >
                      <Check class="h-3 w-3" />
                    </div>
                    <TypographySmall class="text-sm text-foreground">
                      {{ feature }}
                    </TypographySmall>
                  </div>
                </div>

                <Button
                  class="w-full mt-4 hover:scale-105 transition-transform duration-200"
                  :variant="index === 1 ? 'default' : 'secondary'"
                >
                  {{
                    index === 1 ? "Current Plan" : "Switch Plan"
                  }}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </template>
  </div>
</template>