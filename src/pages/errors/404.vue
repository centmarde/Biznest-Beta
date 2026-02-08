<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, Search } from 'lucide-vue-next'

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
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-green-600 opacity-20">404</h1>
      </div>

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <Search class="w-12 h-12 text-red-600" />
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>

      <!-- Description -->
      <p class="text-gray-600 text-lg leading-relaxed mb-8 px-4">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

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
          Go Back
        </button>
      </div>

      <!-- Footer Text -->
      <p class="text-sm text-gray-500 mt-12">
        If you believe this is an error, please contact support.
      </p>
    </div>
  </div>
</template>
