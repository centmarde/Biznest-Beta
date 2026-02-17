<template>
  <div class="min-h-screen bg-prof-lightblue">
    <div class="container mx-auto py-8 px-4">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <TypographyH1 class="text-3xl md:text-4xl font-bold text-prof-navy mb-4">
          Pick Your Location
        </TypographyH1>
        <TypographyP class="text-prof-charcoal text-lg max-w-2xl mx-auto">
          Select the location for your business on the map below. You can search for a specific address or click directly on the map.
        </TypographyP>
      </div>

      <!-- Map Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="mb-4">
          <TypographyH3 class="text-xl font-semibold text-prof-navy mb-2">
            Location Map
          </TypographyH3>
          <TypographyP class="text-gray-600 text-sm">
            Click on the map to select your preferred location
          </TypographyP>
        </div>

        <!-- Google Maps Widget -->
        <div class="rounded-lg overflow-hidden">
          <GmapWidget 
            ref="gmapWidget"
            :center="selectedLocation"
            :zoom="12"
            @location-selected="handleLocationSelect"
          />
        </div>

        
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
        >
          ← Go Back
        </button>
        
        <button 
          @click="confirmLocation"
          :disabled="!selectedLocation"
          :class="[
            'px-8 py-3 rounded-lg font-medium transition-colors duration-200',
            selectedLocation 
              ? 'bg-prof-navy text-white hover:bg-prof-charcoal' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Confirm Location
        </button>

       
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography"
import GmapWidget from '@/components/GmapWidget.vue'

// Router for navigation
const router = useRouter()


const selectedLocation = ref<{ lat: number; lng: number }>({ lat: 14.5995, lng: 120.9842 }) // Manila default
const selectedAddress = ref<string | null>(null)
const locationStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

// Handle location selection from map
const handleLocationSelect = (location: { lat: number; lng: number }) => {
  selectedLocation.value = location
  selectedAddress.value = null // Reset address until geocoding is implemented
  locationStatus.value = {
    type: 'success',
    message: 'Location selected successfully!'
  }
  
  // Clear status after 3 seconds
  setTimeout(() => {
    locationStatus.value = null
  }, 3000)
}

// Go back to previous page
const goBack = () => {
  router.back()
}

// Confirm location selection
const confirmLocation = () => {
  if (!selectedLocation.value) return
  
  locationStatus.value = {
    type: 'success',
    message: 'Location confirmed! Processing...'
  }
  
  // Here you can add logic to save the location or navigate to next step
  console.log('Confirmed location:', selectedLocation.value)
  
  // Example: Navigate to next step or save data
  setTimeout(() => {
    // router.push({ name: 'next-step', query: { lat: selectedLocation.value.lat, lng: selectedLocation.value.lng } })
    locationStatus.value = {
      type: 'success',
      message: 'Location saved successfully!'
    }
  }, 1000)
}

// Component lifecycle
onMounted(() => {
  // You can add initial setup here if needed
  console.log('GmapPickLocationView mounted')
})
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
