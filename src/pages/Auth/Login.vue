<script setup lang="ts">
import { useRouter } from 'vue-router'
import FeatureUnavailable from '@/components/FeatureUnavailable.vue'

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
    <FeatureUnavailable
      title="Login Feature Coming Soon"
      description="User authentication and login functionality is currently under development. Stay tuned for secure access to your Biznest account!"
      @back="handleBack"
    />
  </div>
</template>
