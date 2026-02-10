<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle.vue'

const messageCount = ref(2)
</script>

<template>
  <nav class="bg-white border-b border-gray-200 px-6 py-3">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/logo.jpg" alt="BizNest Logo" class="h-10 w-10 rounded-full" />
        <span class="text-xl font-bold text-prof-navy">BizNest</span>
      </div>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <div class="text-prof-gold">
          <ModeToggle />
        </div>

        <!-- Message Icon with Badge -->
        <Button variant="ghost" size="icon" class="relative text-black">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span v-if="messageCount > 0" class="absolute -top-1 -right-1 bg-prof-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {{ messageCount }}
          </span>
        </Button>

        <!-- Notification Bell -->
        <Button variant="ghost" size="icon" class="text-prof-gold">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Button>

        <!-- User Profile -->
        <Button variant="ghost" size="icon" class="rounded-full">
          <div class="h-10 w-10 rounded-full bg-prof-gold flex items-center justify-center overflow-hidden border-2 border-prof-gold">
            <img src="/BizNest%20(2)%201.png" alt="User Profile" class="w-full h-full object-cover" />
          </div>
        </Button>
      </div>
    </div>
  </nav>
</template>
