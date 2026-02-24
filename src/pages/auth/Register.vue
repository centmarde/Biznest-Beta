<script setup lang="ts">
import RegisterCard from '@/pages/auth/components/RegisterCard.vue'
</script>

<template>
  <div class="h-screen relative flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/Buildings1.jpg')"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Registration Card Container - Centered -->
    <div class="relative z-10 w-full max-w-5xl px-4 max-h-[calc(100vh-4rem)]">
      <RegisterCard />
    </div>
  </div>
</template>
