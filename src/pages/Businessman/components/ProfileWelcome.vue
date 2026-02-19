<script setup lang="ts">
import { TypographyH2, TypographyP } from '@/components/ui/typography'
</script>

<template>
  <div class="bg-background rounded-lg shadow-md p-5">
    <div class="flex items-center gap-4">
      <div class="w-16 h-16 rounded-full bg-prof-gold flex items-center justify-center shrink-0 overflow-hidden border-2 border-foreground/20">
        <img src="/BizNest%20(2)%201.png" alt="User Profile" class="w-full h-full object-cover" />
      </div>
      <div class="text-left">
        <TypographyH2>Hey Mardz, Welcome to Biznest!</TypographyH2>
        <TypographyP>
          Biznest helps you plan, locate, and connect your business within the city ecosystem.
        </TypographyP>
      </div>
    </div>
  </div>
</template>
