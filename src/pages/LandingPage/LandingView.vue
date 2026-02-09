<script setup lang="ts">
import OuterLayout from "@/layout/OuterLayout.vue";
import TypographyH1 from "@/components/ui/typography/TypographyH1.vue";
import TypographyList from "@/components/ui/typography/TypographyList.vue";
import TypographyP from "@/components/ui/typography/TypographyP.vue";
import { Card } from "@/components/ui/card";
</script>

<template>
  <OuterLayout>
    <template #content>
      <div
        class="relative w-full min-h-screen bg-background flex items-center overflow-hidden"
      >
        <div
          class="pl-6 md:pl-12 pr-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-12"
        >
          <!-- Left Side: Text Content -->
          <div class="text-left order-2 lg:order-1 ml-10">
            <TypographyH1>
              Find your perfect<br />location effortlessly.
            </TypographyH1>

            <TypographyList>
              <li>AI-powered location matching</li>
              <li>Advanced analytics and reporting</li>
              <li>Seamless management platform</li>
            </TypographyList>

            <TypographyP>
              Leverage real-time data and predictive models to identify the most
              promising opportunities for your business growth. Reduce risks and
              maximize ROI with our comprehensive location intelligence suite.
            </TypographyP>
          </div>

          <!-- Right Side: Image Layers -->
          <div
            class="relative w-full h-[600px] md:h-[600px] flex items-center justify-end order-1 lg:order-2"
          >
            <!-- Layer 1: Back Card (Primary Color) - Large, Right side, Vertically centered -->
            <Card
              class="absolute right-0 top-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary border-none shadow-none z-0 rounded-l-3xl rounded-r-none"
            />

            <!-- Layer 2: Middle Card (Background Color) - Smaller, Right side (inside Layer 1), Vertically centered -->
            <Card
              class="absolute right-0 top-1/2 -translate-y-1/2 w-[95%] h-[85%] bg-background border shadow-xl z-10 rounded-l-2xl rounded-r-none"
            />

            <!-- Layer 3: Image (Large, Centered on Layer 2) -->
            <div
              class="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full z-20 flex items-center justify-center"
            >
              <img
                src="/landing.png"
                alt="Platform Preview"
                class="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </OuterLayout>
</template>
