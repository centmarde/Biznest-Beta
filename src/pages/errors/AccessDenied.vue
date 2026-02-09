<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ShieldAlert, Home, ArrowLeft } from 'lucide-vue-next'
import { TypographyH1, TypographyH2, TypographyP, TypographySmall } from '@/components/ui/typography'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="text-center max-w-2xl w-full">
      <!-- Error Code -->
      <div class="mb-8">
        <TypographyH1 class="text-red-600 opacity-20">403</TypographyH1>
      </div>

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldAlert class="w-12 h-12 text-red-600" />
        </div>
      </div>

      <!-- Title -->
      <TypographyH2 class="text-gray-800 mb-4">
        Access Denied
      </TypographyH2>

      <!-- Description -->
      <TypographyP class="text-gray-600 mb-8 px-4">
        You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
      </TypographyP>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="goHome"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-lg
                 bg-green-600 text-white font-semibold
                 hover:bg-green-700 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Home class="w-5 h-5" />
          Go to Homepage
        </button>
        
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-lg
                 bg-gray-200 text-gray-700 font-semibold
                 hover:bg-gray-300 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <ArrowLeft class="w-5 h-5" />
          Go Back
        </button>
      </div>

      <!-- Footer Text -->
      <TypographySmall class="text-gray-500 mt-12">
        Need help? Contact support@biznest.com
      </TypographySmall>
    </div>
  </div>
</template>
