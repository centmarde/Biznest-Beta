<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

defineOptions({
  inheritAttrs: false,
});

const route = useRoute();

interface SidebarLink {
  name: string;
  href: string;
  icon: Component;
}

const mainLinks: SidebarLink[] = [
  { name: "Dashboard", href: "/home", icon: LayoutDashboard },
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
        'w-72 pb-2 bg-card-foreground/90 text-primary-foreground h-[calc(100vh-6rem)] overflow-y-auto m-6 rounded-lg flex flex-col',
        $attrs.class ?? '',
      )
    "
  >
    <div class="space-y-12 py-10 px-6 flex-1 flex flex-col justify-center">
      <Card
        v-for="link in mainLinks"
        :key="link.name"
        class="py-1 px-1 bg-card hover:bg-card/90 rounded-lg"
      >
        <Button
          :variant="route.path === link.href ? 'secondary' : 'ghost'"
          class="justify-center text-foreground montserrat-normal rounded-xl"
          as-child
        >
          <router-link :to="link.href">
            <component :is="link.icon" class="mr-2 h-4 w-4" />
            {{ link.name }}
          </router-link>
        </Button>
      </Card>
    </div>

    <div class="space-y-1 py-4 px-3">
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
