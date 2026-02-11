<script setup lang="ts">
import RegisterCard from '@/pages/RegisterPage/components/RegisterCard.vue'
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-end overflow-hidden">
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/Buildings1.jpg')"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Registration Card Container - Right Side -->
    <div class="relative z-10 w-full max-w-md mr-8 lg:mr-16 xl:mr-24">
      <RegisterCard />
    </div>
  </div>
</template>
