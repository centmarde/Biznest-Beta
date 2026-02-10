<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const activeNav = ref('business-profile')
const isCollapsed = ref(false)

const navItems = [
  { id: 'business-profile', label: 'Business Profile', icon: '📊' },
  { id: 'my-business', label: 'My Business', icon: '💼' },
  { id: 'find-location', label: 'Find Location', icon: '📍' },
  { id: 'suppliers', label: 'Suppliers & Partners', icon: '🤝' },
  { id: 'insights', label: 'Insights', icon: '📈' }
]

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside :class="[
    'bg-[#052A5D] text-white min-h-[calc(100vh-120px)] flex flex-col pb-6 pt-6 relative ml-4 my-4 shadow-lg transition-all duration-300 overflow-visible',
    isCollapsed ? 'w-20 px-2 rounded-l-xl' : 'w-64 px-4 rounded-xl'
  ]">
    <!-- Wavy Edge (only visible when collapsed) -->
    <div v-if="isCollapsed" class="absolute top-0 right-0 bottom-0 w-2 overflow-visible">
      <svg class="absolute top-0 left-0 h-full w-8" viewBox="0 0 32 800" preserveAspectRatio="none">
        <path d="M0,0 L0,800 Q16,750 16,700 T16,600 T16,500 T16,400 T16,300 T16,200 T16,100 T16,0 Z" fill="#052A5D"/>
      </svg>
    </div>

    <!-- Toggle Button -->
    <div class="flex justify-end mb-4 relative z-20">
      <Button 
        variant="ghost" 
        size="icon"
        class="text-white hover:bg-white/10 h-8 w-8"
        @click="toggleCollapse"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            v-if="!isCollapsed"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
          <path 
            v-else
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </Button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-8 mt-6 relative z-20">
      <Button
        v-for="(item, index) in navItems"
        :key="item.id"
        :class="[
          'transition-all',
          isCollapsed ? 'w-10 h-10 p-0 rounded-full bg-white text-[#052A5D] hover:bg-white/90' : 'w-full font-medium py-2 h-auto justify-center',
          !isCollapsed && index === 0 ? 'bg-white text-[#052A5D] hover:bg-white/95' : '',
          !isCollapsed && index !== 0 ? 'bg-[#052A5D] text-white hover:bg-[#052A5D]/90 border border-white/30' : '',
          !isCollapsed && index === 0 && activeNav === item.id ? 'shadow-md' : '',
          !isCollapsed && index === 0 && activeNav !== item.id ? 'bg-white/90 hover:shadow-sm' : ''
        ]"
        @click="activeNav = item.id"
        :title="isCollapsed ? item.label : ''"
      >
        <svg v-if="isCollapsed" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <template v-else>
          <span class="mr-2 text-base">{{ item.icon }}</span>
          <span class="text-xs">{{ item.label }}</span>
        </template>
      </Button>
    </nav>

    <!-- Footer Actions -->
    <div :class="['pt-6 border-t border-white/20 relative z-20', isCollapsed ? 'space-y-4' : 'space-y-2']">
      <Button 
        variant="ghost" 
        :class="[
          'transition-all',
          isCollapsed ? 'w-10 h-10 p-0 rounded-full bg-white/10 text-white hover:bg-white/20' : 'w-full text-white hover:bg-white/10 font-medium py-2 h-auto justify-start'
        ]"
        :title="isCollapsed ? 'Settings' : ''"
      >
        <svg :class="[isCollapsed ? 'w-5 h-5' : 'w-4 h-4', !isCollapsed && 'mr-2']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span v-if="!isCollapsed" class="text-xs">Settings</span>
      </Button>
      <Button 
        variant="ghost" 
        :class="[
          'transition-all',
          isCollapsed ? 'w-10 h-10 p-0 rounded-full bg-[#c9a24d] text-white hover:bg-[#c9a24d]/90' : 'w-full text-white hover:bg-white/10 font-medium py-2 h-auto justify-start'
        ]"
        :title="isCollapsed ? 'Logout' : ''"
      >
        <svg :class="[isCollapsed ? 'w-5 h-5' : 'w-4 h-4', !isCollapsed && 'mr-2']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-if="!isCollapsed" class="text-xs">Logout</span>
      </Button>
    </div>
  </aside>
</template>
