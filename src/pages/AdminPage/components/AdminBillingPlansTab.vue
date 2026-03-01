<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TypographySmall } from "@/components/ui/typography";
import { Check } from "lucide-vue-next";
import type { Plan } from "@/stores/billingData";

interface Props {
  plans: Plan[];
  formatCurrency: (amount: number) => string;
}

const props = defineProps<Props>();
</script>

<template>
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
</template>
