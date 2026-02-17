<script setup lang="ts">
import InnerNavbar from "@/components/InnerNavbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <InnerNavbar />
    <main class="flex-1">
      <slot name="content"></slot>
    </main>
    <Sidebar />
  </div>
</template>

<style scoped></style>
