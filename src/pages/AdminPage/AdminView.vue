<script setup lang="ts">
import InnerLayout from '@/layout/InnerLayout.vue'
</script>

<template>
  <InnerLayout>
    <template #content>
      <router-view />
    </template>
  </InnerLayout>
</template>