<script setup lang="ts">
import { useRouter } from 'vue-router'
import FeatureUnavailable from '@/components/FeatureUnavailable.vue'

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center">
    <FeatureUnavailable
      title="Registration Coming Soon"
      description="New user registration is currently under development. Soon you'll be able to create your Biznest account and start connecting with business opportunities!"
      @back="handleBack"
    />
  </div>
</template>
