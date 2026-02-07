<script setup lang="ts">
import OuterLayout from "@/layout/OuterLayout.vue";
import TypographyH1 from "@/components/ui/typography/TypographyH1.vue";
import TypographyList from "@/components/ui/typography/TypographyList.vue";
</script>

<template>
  <OuterLayout>
    <template #content>
      <div
        class="relative w-full min-h-screen bg-prof-offwhite overflow-hidden"
      >
        <!-- Hero Content -->
        <div class="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-12">
          <!-- Text Content -->
          <div class="text-center space-y-6 mb-16 md:mb-24">
            <TypographyH1>
              Find your perfect<br />location effortlessly.
            </TypographyH1>

            <TypographyList>
              AI-powered location matching, advanced analytics, and seamless<br
                class="hidden md:block"
              />
              management – all in one powerful platform.
            </TypographyList>
          </div>
        </div>

        <!-- Image Section -->
        <div class="w-full px-6 md:px-12 pb-0">
          <div class="max-w-7xl mx-auto">
            <img
              src="/building.png"
              alt="Building"
              class="w-full h-auto object-cover rounded-t-lg"
            />
          </div>
        </div>
      </div>
    </template>
  </OuterLayout>
</template>
