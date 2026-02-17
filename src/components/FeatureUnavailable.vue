<script setup lang="ts">
import { Construction, ArrowLeft } from 'lucide-vue-next'
import { TypographyH2, TypographyP, TypographySmall } from '@/components/ui/typography'

interface Props {
  title?: string
  description?: string
  showIcon?: boolean
  showBackButton?: boolean
}

interface Emits {
  back: []
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Feature Not Available',
  description: 'This feature is currently under development and will be available soon.',
  showIcon: true,
  showBackButton: true
})

const emit = defineEmits<Emits>()

const handleBack = () => {
  emit('back')
}
</script>
<template>
  <div class="flex items-center justify-center min-h-[450px] p-8 bg-transparent">
    <div class="text-center max-w-lg w-full">

      <!-- Icon Section -->
      <div v-if="props.showIcon" class="flex justify-center mb-5">
        <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <Construction class="w-10 h-10 text-green-600" />
        </div>
      </div>

      <!-- Title -->
      <TypographyH2 class="text-gray-800 mb-3">
        {{ props.title }}
      </TypographyH2>

      <!-- Description -->
      <TypographyP class="text-gray-600 px-4">
        {{ props.description }}
      </TypographyP>

      <!-- Back Button -->
      <div v-if="props.showBackButton" class="mt-8">
        <button
          @click="handleBack"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                 bg-green-600 text-white font-semibold
                 hover:bg-green-700 transition-all duration-200 focus:outline-none"
        >
          <ArrowLeft class="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      <!-- Footer -->
      <TypographySmall class="text-gray-500 mt-10">
        More features available soon
      </TypographySmall>

    </div>
  </div>
</template>



<style scoped>
/* Minimal scoped styles - relying on Tailwind for consistency */
</style>