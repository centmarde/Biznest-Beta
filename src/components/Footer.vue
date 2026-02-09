<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="w-full border-t bg-background py-6 md:py-0">
    <div
      class="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:h-24 md:flex-row md:px-8"
    >
      <div class="flex flex-col items-center gap-4 md:flex-row md:gap-2">
        <p
          class="text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          Built by
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            Biznest
          </a>
          . &copy; {{ currentYear }} All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
