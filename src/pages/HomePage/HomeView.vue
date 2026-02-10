<script setup lang="ts">
import LoginSimple from './components/LoginSimple.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
  >
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Biznest</h1>
    <p class="text-lg text-gray-600 mb-8">
      Connecting Business Owners and Landowners.
    </p>
    
    <LoginSimple />
  </div>
</template>
