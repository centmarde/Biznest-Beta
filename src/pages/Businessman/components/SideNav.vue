<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const activeNav = ref('business-profile')

const navItems = [
  { id: 'business-profile', label: 'Business Profile', icon: '📊' },
  { id: 'my-business', label: 'My Business', icon: '💼' },
  { id: 'find-location', label: 'Find Location', icon: '📍' },
  { id: 'suppliers', label: 'Suppliers & Partners', icon: '🤝' },
  { id: 'insights', label: 'Insights', icon: '📈' }
]
</script>

<template>
  <aside class="w-64 bg-[#052A5D] text-white min-h-[calc(100vh-120px)] flex flex-col px-4 pb-6 pt-6 relative ml-4 my-4 rounded-xl shadow-lg">
    <!-- Navigation -->
    <nav class="flex-1 space-y-8 mt-6 relative z-10">
      <Button
        v-for="(item, index) in navItems"
        :key="item.id"
        :class="[
          'w-full justify-center font-medium transition-all py-2 h-auto',
          index === 0 ? 'bg-white text-[#052A5D] hover:bg-white/95' : 'bg-[#052A5D] text-white hover:bg-[#052A5D]/90 border border-white/30',
          index === 0 && activeNav === item.id ? 'shadow-md' : '',
          index === 0 && activeNav !== item.id ? 'bg-white/90 hover:shadow-sm' : ''
        ]"
        @click="activeNav = item.id"
      >
        <span class="mr-2 text-base">{{ item.icon }}</span>
        <span class="text-xs">{{ item.label }}</span>
      </Button>
    </nav>

    <!-- Footer Actions -->
    <div class="space-y-2 pt-6 border-t border-white/20 relative z-10">
      <Button variant="ghost" class="w-full justify-start text-white hover:bg-white/10 font-medium py-2 h-auto transition-all">
        <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="text-xs">Settings</span>
      </Button>
      <Button variant="ghost" class="w-full justify-start text-white hover:bg-white/10 font-medium py-2 h-auto transition-all">
        <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="text-xs">Logout</span>
      </Button>
    </div>
  </aside>
</template>
