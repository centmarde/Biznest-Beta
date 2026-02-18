<script setup lang="ts">
import InnerNavbar from "@/components/InnerNavbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <InnerNavbar />
    <div class="flex flex-1 bg-background">
      <aside class="hidden w-64 flex-col md:flex">
        <Sidebar class="flex-1" />
      </aside>
      <main class="flex-1 p-6">
        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>
