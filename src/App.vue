<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import TypographyH2 from "./components/ui/typography/TypographyH2.vue";
import TypographyP from "./components/ui/typography/TypographyP.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="text-center space-y-4">
        <TypographyH2>Welcome to Vue 3 + Vite</TypographyH2>
        <TypographyP>
          A modern development setup with Tailwind CSS and shadcn-vue
        </TypographyP>
      </div>

      <div class="flex flex-col items-center space-y-6">
        <HelloWorld msg="Vite + Vue" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
