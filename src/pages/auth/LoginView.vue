<script setup lang="ts">
import LoginWidget from '@/pages/auth/components/LoginWidget.vue'
</script>

<template>
  <div class="min-h-screen h-screen overflow-hidden relative flex items-center justify-center">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/Buildings1.jpg')"
    >
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Login Widget Container - Centered -->
    <div class="relative z-10 w-full max-w-3xl px-4">
      <LoginWidget />
    </div>
  </div>
</template>
