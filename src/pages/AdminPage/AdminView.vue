<script lang="ts" setup>
import InnerLayout from "@/layout/InnerLayout.vue";
</script>

<template>
  <InnerLayout>
    <template #content>
      <router-view />
    </template>
  </InnerLayout>
</template>
