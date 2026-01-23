<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
	<div class="min-h-screen bg-gray-50 py-12 px-4">
		<div class="max-w-4xl mx-auto space-y-8">
			<div class="text-center space-y-4">
				<h1 class="text-4xl font-bold text-gray-900">Welcome to Vue 3 + Vite</h1>
				<p class="text-lg text-gray-600">A modern development setup with Tailwind CSS and shadcn-vue</p>
			</div>
			
			<div class="flex flex-col items-center space-y-6">
				<HelloWorld msg="Vite + Vue" />
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>
