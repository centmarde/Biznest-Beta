<script setup lang="ts">
import InnerNavbar from "@/components/InnerNavbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <InnerNavbar />
     <div class="flex flex-1 overflow-hidden">
      <aside class="hidden w-72 shrink-0 flex-col bg-background md:flex p-3">
        <Sidebar class="flex-1" />
      </aside>
      <main class="flex-1 overflow-y-auto p-6">
        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>
