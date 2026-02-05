<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import OuterLayout from "@/layout/OuterLayout.vue";
</script>

<template>
  <OuterLayout>
		<template v-slot:content>
			<div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50"
  >
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Biznest</h1>
    <p class="text-lg text-gray-600">
      Landing
    </p>
    <HelloWorld msg="Vite + Vue" />
  </div>
		</template>
  </OuterLayout>
</template>
