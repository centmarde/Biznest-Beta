<script setup lang="ts">

import TypographyH1 from '@/components/ui/typography/TypographyH1.vue'
import TypographyP from '@/components/ui/typography/TypographyP.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
  >
    <TypographyH1 class="text-gray-900 mb-4">Welcome to Biznest</TypographyH1>
    <TypographyP class="text-lg text-gray-600 mb-8">
      Connecting Business Owners and Landowners.
    </TypographyP>
    
    <LoginSimple />
  </div>
</template>
