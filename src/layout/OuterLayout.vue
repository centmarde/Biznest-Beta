<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <slot name="content"></slot>
  <!-- <div class="text-center my-5">Footer Direa</div> -->
</template>

<style scoped></style>
