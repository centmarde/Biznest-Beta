<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModeToggle from "@/components/ModeToggle.vue";

const router = useRouter();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navigateTo = (path: string) => {
  router.push(path);
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav
    class="bg-background/90 border-b border-[#0A2540]/10 sticky top-0 z-50 backdrop-blur-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <button
            @click="navigateTo('/')"
            class="text-2xl font-bold text-foreground hover:text-foreground/90 transition-colors"
          >
            Biznest
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <button
            @click="navigateTo('/')"
            class="text-foreground hover:text-foreground/90 text-sm font-medium transition-colors"
          >
            Home
          </button>
          <button
            @click="navigateTo('/about')"
            class="text-foreground hover:text-foreground/90 text-sm font-medium transition-colors"
          >
            About
          </button>
          <button
            @click="navigateTo('/features')"
            class="text-foreground hover:text-foreground/90 text-sm font-medium transition-colors"
          >
            Features
          </button>
          <button
            @click="navigateTo('/contact')"
            class="text-foreground hover:text-foreground/90 text-sm font-medium transition-colors"
          >
            Contact
          </button>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <ModeToggle />
          <button
            @click="navigateTo('/signup')"
            class="bg-[#C9A24D] hover:bg-[#C9A24D]/90 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-foreground/90 hover:text-foreground transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-[#0A2540] border-t border-white/10"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <button
          @click="navigateTo('/')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
          Home
        </button>
        <button
          @click="navigateTo('/about')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
          About
        </button>
        <button
          @click="navigateTo('/features')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
          Features
        </button>
        <button
          @click="navigateTo('/contact')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
          Contact
        </button>
      </div>
      <div class="px-4 py-3 border-t border-white/10 space-y-2">
        <div class="flex justify-center pb-2">
          <ModeToggle />
        </div>
        <button
          @click="navigateTo('/signup')"
          class="block w-full text-center bg-prof-gold hover:bg-[#C9A24D]/90 text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>
