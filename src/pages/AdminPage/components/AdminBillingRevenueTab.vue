<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/typography";
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-vue-next";
import type { RevenueEntry } from "@/stores/billingData";

interface Props {
  revenueHistory: RevenueEntry[];
  formatCurrency: (amount: number) => string;
  getRevenueBarHeight: (revenue: number) => string;
}

const props = defineProps<Props>();
</script>

<template>
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
              class="w-full rounded-t-lg bg-prof-gold/80 dark:bg-prof-gold/60 hover:bg-prof-gold transition-all duration-300 min-h-2"
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
</template>
