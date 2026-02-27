<!-- src/components/ThemeToggle.vue -->
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'icon',
  showLabel: false
})

const { isDark, toggleTheme } = useTheme()

const icon = computed(() => isDark.value ? '🌙' : '☀️')
const label = computed(() => isDark.value ? 'Dark Mode' : 'Light Mode')
const ariaLabel = computed(() => `Switch to ${isDark.value ? 'light' : 'dark'} mode`)
</script>

<template>
  <Button
    :variant="props.variant"
    :size="props.size"
    @click="toggleTheme"
    :aria-label="ariaLabel"
    class="transition-all duration-300 hover:scale-110"
  >
    <span 
      class="text-lg transition-transform duration-300"
      :class="{ 'rotate-180': isDark }"
    >
      {{ icon }}
    </span>
    <span v-if="props.showLabel" class="ml-2 font-medium">
      {{ label }}
    </span>
  </Button>
</template>
