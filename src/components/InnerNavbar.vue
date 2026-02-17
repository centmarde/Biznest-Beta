<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { 
  User, 
  LogOut, 
  Settings, 
  LayoutDashboard 
} from 'lucide-vue-next'
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const router = useRouter()
const authStore = useAuthStore()

const userInitials = computed(() => {
  const name = authStore.user?.name || ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center px-4 md:px-6">
      <!-- Logo / Brand -->
      <div class="mr-4 flex">
        <router-link to="/home" class="mr-6 flex items-center space-x-2">
          <LayoutDashboard class="h-6 w-6" />
          <span class="hidden font-bold sm:inline-block">
            Biznest
          </span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="flex items-center space-x-6 text-sm font-medium">
        <router-link 
          to="/home" 
          class="transition-colors hover:text-foreground/80 text-foreground/60" 
          active-class="text-foreground"
        >
          Dashboard
        </router-link>
      </nav>

      <!-- Right Side Actions -->
      <div class="flex flex-1 items-center justify-end space-x-4">
        <ModeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
              <div class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                 <span class="text-xs font-medium">{{ userInitials }}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">{{ authStore.user?.name }}</p>
                <p class="text-xs leading-none text-muted-foreground">
                  {{ authStore.user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleLogout" class="text-red-600 focus:text-red-600">
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
