<script setup lang="ts">
import LoginCard from '@/pages/LoginPage/components/LoginCard.vue'
</script>

<template>
  <div class="min-h-screen h-screen overflow-hidden relative flex items-center justify-end">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/Buildings1.jpg')"
    >
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Login Card Container - Right Side -->
    <div class="relative z-10 w-full max-w-md mr-8 lg:mr-16 xl:mr-24">
      <LoginCard />
    </div>
  </div>
</template>
