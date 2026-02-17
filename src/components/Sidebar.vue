<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
} from "lucide-vue-next";
import { useRoute } from "vue-router";
import type { Component } from "vue";
import TypographyH2 from "./ui/typography/TypographyH2.vue";

defineOptions({
  inheritAttrs: false,
});

const route = useRoute();

interface SidebarLink {
  name: string;
  href: string;
  icon: Component;
}

interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: "Overview",
    links: [
      { name: "Dashboard", href: "/home", icon: LayoutDashboard },
      { name: "Documentation", href: "/docs", icon: FileText }, // Placeholder
    ],
  },
  {
    title: "Management",
    links: [
      { name: "Users", href: "/users", icon: Users }, // Placeholder
      { name: "Billing", href: "/billing", icon: CreditCard }, // Placeholder
      { name: "Messages", href: "/messages", icon: MessageSquare }, // Placeholder
    ],
  },
  {
    title: "Settings",
    links: [
      { name: "Settings", href: "/settings", icon: Settings }, // Placeholder
    ],
  },
];
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
    <div class="space-y-4 py-4">
      <div v-for="group in sidebarGroups" :key="group.title" class="px-3 py-2">
        <TypographyH2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          {{ group.title }}
        </TypographyH2>
        <div class="space-y-1">
          <Button
            v-for="link in group.links"
            :key="link.name"
            :variant="route.path === link.href ? 'secondary' : 'ghost'"
            class="w-full justify-start"
            as-child
          >
            <router-link :to="link.href">
              <component :is="link.icon" class="mr-2 h-4 w-4" />
              {{ link.name }}
            </router-link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
