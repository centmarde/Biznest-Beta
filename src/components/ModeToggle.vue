<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { useTheme } from "@/composables/useTheme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ref } from 'vue';

const { setTheme } = useTheme();

// Support for system preference detection
const isSystemPreference = ref(false);

const setLightMode = () => {
  setTheme('light');
  isSystemPreference.value = false;
};

const setDarkMode = () => {
  setTheme('dark');
  isSystemPreference.value = false;
};

const setAutoMode = () => {
  // Detect system preference and apply it
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
  isSystemPreference.value = true;
  
  // Remove stored preference to allow auto-switching
  localStorage.removeItem('biznest-theme');
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="bg-prof-white dark:bg-prof-navy border-prof-lightblue">
        <Moon
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-prof-navy"
        />
        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-prof-gold"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-nav-background border-prof-lightblue">
      <DropdownMenuItem @click="setLightMode" class="hover:bg-prof-lightblue text-foreground hover:text-prof-navy">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="setDarkMode" class="hover:bg-prof-lightblue text-foreground hover:text-prof-navy">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="setAutoMode" class="hover:bg-prof-lightblue text-foreground hover:text-prof-navy">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
