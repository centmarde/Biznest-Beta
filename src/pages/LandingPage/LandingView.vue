<script setup lang="ts">
import OuterLayout from "@/layout/OuterLayout.vue";
import TypographyH1 from "@/components/ui/typography/TypographyH1.vue";
import TypographyP from "@/components/ui/typography/TypographyP.vue";
import FeatureGrid from "./components/FeatureGrid.vue";
</script>

<template>
  <OuterLayout>
    <template #content>
      <div
        class="relative w-full min-h-[50vh] bg-background flex flex-col items-center justify-start overflow-hidden pt-12"
      >
        <div class="text-center max-w-4xl px-6">
          <TypographyP class="mx-auto max-w-2xl">
            An AI-powered system that helps choose business locations and
            connects local businesses in your city
          </TypographyP>
          <TypographyH1 class="font-heading mb-6">
            Find your perfect<br />location effortlessly.
          </TypographyH1>
        </div>
      </div>

      <!-- Feature Grid Section -->
      <FeatureGrid />
    </template>
  </OuterLayout>
</template>
