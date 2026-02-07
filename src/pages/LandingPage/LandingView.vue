<script setup lang="ts">
import OuterLayout from "@/layout/OuterLayout.vue";
import { Card, CardContent } from "@/components/ui/card";
</script>

<template>
  <OuterLayout>
    <template #content>
      <div
        class="relative w-full min-h-screen bg-prof-charcoal overflow-hidden flex items-center"
      >
        <!-- Main Container -->
        <div class="w-full h-screen flex items-stretch">
          <!-- Left Half: Text Content -->
          <div
            class="w-full lg:w-1/2 flex items-center justify-start p-6 md:p-12 lg:pl-16 xl:pl-24"
          >
            <div class="space-y-10 text-white max-w-xl">
              <!-- Logo -->
              <div class="mb-4">
                <div
                  class="px-4 py-1 bg-prof-navy text-white inline-block font-bold text-xl tracking-wider"
                >
                  Givonic.
                </div>
              </div>

              <h1
                class="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
              >
                Choose ideal <br />
                locations instantly
              </h1>

              <p
                class="text-prof-lightblue text-base md:text-lg leading-relaxed"
              >
                An AI-powered system that helps choose business locations and
                connects local businesses in your city.
              </p>

              <ul class="space-y-6 text-base md:text-lg">
                <li class="flex items-center gap-4">
                  <span class="w-1.5 h-1.5 bg-prof-gold rounded-full"></span>
                  <span>lorem ipsum</span>
                </li>
                <li class="flex items-center gap-4">
                  <span class="w-1.5 h-1.5 bg-prof-gold rounded-full"></span>
                  <span>features here</span>
                </li>
                <li class="flex items-center gap-4">
                  <span class="w-1.5 h-1.5 bg-prof-gold rounded-full"></span>
                  <span>features there</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Half: Card with Image -->
          <div
            class="hidden lg:flex lg:w-1/2 items-center justify-end"
          >
            <Card class="w-full h-[85vh] bg-prof-lightblue shadow-2xl overflow-hidden">
              <CardContent class="p-6 h-full flex items-center justify-center">
                <img
                  src="/landingMap.jpeg"
                  alt="3D City Map"
                  class="w-full h-full object-contain"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </template>
  </OuterLayout>
</template>

<style scoped>
.font-serif {
  font-family: "Times New Roman", Times, serif;
}
</style>
