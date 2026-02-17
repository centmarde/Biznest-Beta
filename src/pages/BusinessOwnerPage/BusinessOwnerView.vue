
<script setup lang="ts">
import { ref } from 'vue'
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import BusinessOwnerWidget from './components/BusinessOwnerWidget.vue'

// State for selected option
const selectedOption = ref<'have-lot' | 'have-business' | 'need-space' | 'need-supplier' | null>(null)

// Handle option selection from widget
const handleOptionSelection = (option: 'have-lot' | 'have-business' | 'need-space' | 'need-supplier') => {
  selectedOption.value = option
  console.log('Selected business option:', option)
  // Here you can add navigation logic or other actions based on the selection
}

// Helper function to get option label
const getOptionLabel = (option: string): string => {
  const labels = {
    'have-lot': 'I have a lot',
    'have-business': 'I have a business, but no lot', 
    'need-space': 'I need space rental/lot for sale',
    'need-supplier': 'I need supplier for my business'
  }
  return labels[option as keyof typeof labels] || option
}
</script>

<template>
  <div class="min-h-screen bg-prof-lightblue">
    <div class="container mx-auto py-8">
      <!-- Business Owner Widget -->
      <BusinessOwnerWidget @option-selected="handleOptionSelection" />
      
      <!-- Selected Option Display (for demonstration) -->
      <div v-if="selectedOption" class="mt-8 text-center">
        <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <TypographyH3 class="text-lg font-semibold text-prof-navy mb-2">Selected Option:</TypographyH3>
          <TypographyP class="text-prof-charcoal">{{ getOptionLabel(selectedOption) }}</TypographyP>
        </div>
      </div>
    </div>
  </div>
</template>

