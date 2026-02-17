<script setup lang="ts">
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography"

// Define emit events for parent component
const emit = defineEmits<{
  'option-selected': [option: 'have-lot' | 'have-business' | 'need-space' | 'need-supplier']
}>()

// Handle option selection
const selectOption = (option: 'have-lot' | 'have-business' | 'need-space' | 'need-supplier') => {
  emit('option-selected', option)
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 py-8">
    <!-- Title -->
    <div class="text-center mb-12">
      <TypographyH1 class="text-3xl md:text-4xl font-bold text-prof-navy mb-4">
        What describes your current business situation?
      </TypographyH1>
    </div>

    <!-- Options Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <!-- Option 1: I have a lot -->
      <div class="bg-white rounded-xl border-2 border-prof-navy shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
        <div class="flex-1">
          <div class="text-center mb-6">
            <div class="text-5xl mb-4">🏠</div>
            <TypographyH3 class="text-xl font-semibold text-prof-navy mb-4">I have a lot</TypographyH3>
            <TypographyP class="text-gray-600 text-sm leading-relaxed">
              You own land and want to explore the best business opportunities for your location.
            </TypographyP>
          </div>
        </div>
        <button 
          @click="selectOption('have-lot')"
          class="w-full bg-prof-navy text-white py-3 px-4 rounded-lg hover:bg-prof-charcoal transition-colors duration-200 font-medium"
        >
          Select this option
        </button>
      </div>

      <!-- Option 2: I have a business, but no lot -->
      <div class="bg-white rounded-xl border-2 border-teal-500 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
        <div class="flex-1">
          <div class="text-center mb-6">
            <div class="text-5xl mb-4">🚀</div>
            <TypographyH3 class="text-xl font-semibold text-prof-navy mb-4">I have a business, but no lot</TypographyH3>
            <TypographyP class="text-gray-600 text-sm leading-relaxed">
              You have a business idea or existing business but need to find the ideal location to set up or expand.
            </TypographyP>
          </div>
        </div>
        <button 
          @click="selectOption('have-business')"
          class="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200 font-medium"
        >
          Select this option
        </button>
      </div>

      <!-- Option 3: I need space rental/lot for sale -->
      <div class="bg-white rounded-xl border-2 border-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
        <div class="flex-1">
          <div class="text-center mb-6">
            <div class="text-5xl mb-4">📍</div>
            <TypographyH3 class="text-xl font-semibold text-prof-navy mb-4">I need space rental/lot for sale</TypographyH3>
            <TypographyP class="text-gray-600 text-sm leading-relaxed">
              You're looking for available lots or rental spaces that match your business requirements.
            </TypographyP>
          </div>
        </div>
        <button 
          @click="selectOption('need-space')"
          class="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
        >
          Select this option
        </button>
      </div>

      <!-- Option 4: I need supplier for my business -->
      <div class="bg-white rounded-xl border-2 border-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
        <div class="flex-1">
          <div class="text-center mb-6">
            <div class="text-5xl mb-4">🤝</div>
            <TypographyH3 class="text-xl font-semibold text-prof-navy mb-4">I need supplier for my business</TypographyH3>
            <TypographyP class="text-gray-600 text-sm leading-relaxed">
              Connect with verified suppliers and business partners to support your operations.
            </TypographyP>
          </div>
        </div>
        <button 
          @click="selectOption('need-supplier')"
          class="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
        >
          Select this option
        </button>
      </div>
    </div>
  </div>
</template>


