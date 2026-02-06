<script setup lang="ts">
import OuterLayout from "@/layout/OuterLayout.vue";
</script>

<template>
  <OuterLayout>
    <template #content>
      <div
        class="relative w-full min-h-screen bg-prof-navy overflow-hidden text-white flex items-center"
      >
        <!-- Main Container -->
        <div
          class="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
        >
          <!-- Left Column: Text -->
          <div class="space-y-10">
            <!-- Logo (Simulated as per design) -->
            <div class="mb-4">
              <div
                class="px-4 py-1 bg-prof-charcoal text-white inline-block font-bold text-xl tracking-wider"
              >
                Givonic.
              </div>
            </div>

            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight"
            >
              Choose ideal <br />
              locations instantly
            </h1>

            <p
              class="text-prof-lightblue text-lg md:text-xl max-w-lg leading-relaxed"
            >
              An AI-powered system that helps choose business locations and
              connects local businesses in your city.
            </p>

            <ul class="space-y-6 text-lg">
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

          <!-- Right Column: Image & Shape -->
          <div
            class="relative h-full min-h-[400px] flex items-center justify-center lg:justify-end"
          >
            <!-- The White Background Shape -->
            <!-- Positioned to flow off the right edge -->
            <div
              class="absolute right-[-50vw] top-1/2 -translate-y-1/2 w-[100vw] h-[140%] bg-prof-offwhite rounded-l-[40px] z-0 hidden lg:block transform translate-x-[20%]"
            ></div>

            <!-- Mobile/Tablet Background Shape -->
            <div
              class="absolute inset-0 bg-prof-offwhite rounded-[30px] z-0 lg:hidden opacity-90"
            ></div>

            <!-- The Image -->
            <!-- Using a placeholder that resembles the 3D isometric city map -->
            <div
              class="relative z-10 w-full max-w-lg lg:max-w-none transform lg:scale-125 lg:translate-x-10"
            >
              <img
                src="https://placehold.co/800x600/f8fafc/0f172a?text=Interactive+3D+City+Map"
                alt="3D City Map"
                class="w-full h-auto object-cover rounded-lg"
              />
            </div>
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
