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

          <img
            src="/logo.png"
            alt="Logo"
            class="hidden md:block h-90 w-auto mx-auto -my-18"
          />

          <div class="flex flex-col gap-2">
            <TypographyH1 class="oswald-bold"> CHOOSE IDEAL </TypographyH1>
            <TypographyH1 class="montserrat-semibold tracking-widest">
              LOCATION INSTANTLY
            </TypographyH1>
          </div>
        </div>
      </div>

      <!-- Feature Grid Section -->
      <FeatureGrid />
    </template>
  </OuterLayout>
</template>
