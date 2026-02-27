<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModeToggle from "@/components/ModeToggle.vue";
import { Button } from "@/components/ui/button";

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
    class="bg-nav-background border-b border-prof-navy/10 sticky top-0 z-50 backdrop-blur-sm"
  >
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <Button
            variant="link"
            @click="navigateTo('/')"
            class="hover:no-underline p-0 h-auto"
          >
            <img
              src="/logo.png"
              alt="Biznest Logo"
              class="h-25 w-auto rounded-full"
            />
          </Button>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <ModeToggle />
          <Button
            @click="navigateTo('/signin')"
            class="bg-prof-gold hover:bg-prof-gold/90 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            @click="toggleMobileMenu"
            class="text-foreground/90 hover:text-foreground transition-colors"
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
          </Button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-prof-navy border-t border-white/10"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <Button
          variant="ghost"
          @click="navigateTo('/')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors h-auto justify-start"
        >
          Home
        </Button>
        <Button
          variant="ghost"
          @click="navigateTo('/about')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors h-auto justify-start"
        >
          About
        </Button>
        <Button
          variant="ghost"
          @click="navigateTo('/features')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors h-auto justify-start"
        >
          Features
        </Button>
        <Button
          variant="ghost"
          @click="navigateTo('/contact')"
          class="block w-full text-left text-foreground hover:text-foreground/90 hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium transition-colors h-auto justify-start"
        >
          Contact
        </Button>
      </div>
      <div class="px-4 py-3 border-t border-white/10 space-y-2">
        <div class="flex justify-center pb-2">
          <ModeToggle />
        </div>
        <Button
          @click="navigateTo('/signup')"
          class="block w-full text-center bg-prof-gold hover:bg-prof-gold/90 text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors h-auto"
        >
          Get Started
        </Button>
      </div>
    </div>
  </nav>
</template>
