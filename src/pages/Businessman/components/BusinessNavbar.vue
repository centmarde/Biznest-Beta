<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle.vue'
import { Mail, Bell } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
          <Mail class="h-5 w-5" />
          <span v-if="messageCount > 0" class="absolute -top-1 -right-1 bg-prof-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {{ messageCount }}
          </span>
        </Button>

        <!-- Notification Bell -->
        <Button variant="ghost" size="icon" class="text-prof-gold">
          <Bell class="h-5 w-5" />
        </Button>

        <!-- User Profile -->
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
      </div>
    </div>
  </nav>
</template>
