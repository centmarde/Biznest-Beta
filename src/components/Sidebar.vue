<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  LogOut,
} from "lucide-vue-next";
import { useRoute } from "vue-router";
import type { Component } from "vue";
import TypographyLarge from "./ui/typography/TypographyLarge.vue";

defineOptions({
  inheritAttrs: false,
});

const route = useRoute();
const authStore = useAuthStore();

interface SidebarLink {
  name: string;
  href: string;
  icon: Component;
}

const mainLinks: SidebarLink[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Documentation", href: "/docs", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Messages", href: "/messages", icon: MessageSquare },
];

const bottomLinks: SidebarLink[] = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/", icon: LogOut },
];
</script>

<template>
  <div
    :class="
      cn(
        'w-72 pb-2 bg-card-foreground/90 text-primary-foreground h-[calc(100vh-6rem)] overflow-y-auto rounded-lg flex flex-col',
        $attrs.class ?? '',
      )
    "
  >
    <!-- Welcome User -->
    <div
      class="px-6 py-4 mt-4 flex flex-col items-center justify-center gap-4 montserrat-normal"
    >
      <Avatar class="size-30 border-2 border-primary-foreground/20">
        <AvatarImage
          :src="authStore.user?.avatar || '/avatar.png'"
          :alt="authStore.user?.name || 'User'"
          class="object-cover"
        />
        <AvatarFallback
          class="text-2xl font-bold text-foreground bg-secondary"
          >{{
            authStore.user?.name?.charAt(0).toUpperCase() || "U"
          }}</AvatarFallback
        >
      </Avatar>
      <div class="flex flex-col items-center text-center gap-1">
        <TypographyLarge
          class="text-lg font-bold truncate max-w-[200px]"
          :title="authStore.user?.name"
        >
          Welcome {{ authStore.user?.name || "User" }}!
        </TypographyLarge>
        <Button variant="link" class="h-auto p-0 text-primary-foreground/80">
          Edit
        </Button>
      </div>
    </div>

    <!-- Main Links -->
    <div class="space-y-12 px-6 py-6 flex-1 flex flex-col justify-center">
      <Card
        v-for="link in mainLinks"
        :key="link.name"
        class="py-1 px-1 bg-card hover:bg-card/90 rounded-lg"
      >
        <Button
          :variant="route.path === link.href ? 'secondary' : 'ghost'"
          class="justify-start text-foreground montserrat-normal rounded-xl"
          as-child
        >
          <router-link :to="link.href">
            <component :is="link.icon" class="mr-2 h-4 w-4" />
            {{ link.name }}
          </router-link>
        </Button>
      </Card>
    </div>

    <!-- Bottom Links -->
    <div class="py-4 px-6 mb-4">
      <Button
        v-for="link in bottomLinks"
        :key="link.name"
        :variant="route.path === link.href ? 'secondary' : 'ghost'"
        class="w-full justify-start text-primary-foreground montserrat-normal hover:bg-primary-foreground/90"
        as-child
      >
        <router-link :to="link.href">
          <component :is="link.icon" class="mr-2 h-4 w-4" />
          {{ link.name }}
        </router-link>
      </Button>
    </div>
  </div>
</template>
