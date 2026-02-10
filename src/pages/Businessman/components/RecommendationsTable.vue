<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { Recommendation } from '../composables/useBusinessData'

interface Props {
  recommendations: Recommendation[]
}

defineProps<Props>()

const getStatusColor = (color: string) => {
  const colors: Record<string, string> = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800'
  }
  return colors[color] || colors.green
}
</script>

<template>
  <div class="mt-8 flex justify-center">
    <div class="w-full max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">No Recommended Locations Yet</h3>
            <p class="text-sm text-gray-500 mt-1">
              Update your preferences or expand your area to see matches.
            </p>
          </div>
          <Button variant="link" class="text-[#0a2540]">
            See All →
          </Button>
        </div>

        <!-- Recommendations List -->
        <div class="space-y-3">
      <div
        v-for="rec in recommendations"
        :key="rec.id"
        class="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      >
        <!-- Status Badge -->
        <span
          :class="getStatusColor(rec.statusColor)"
          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
        >
          ● {{ rec.status }}
        </span>

        <!-- Title and Subtitle -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-900">{{ rec.title }}</p>
          <p class="text-sm text-gray-500">{{ rec.subtitle }}</p>
        </div>

        <!-- Price -->
        <div class="text-right min-w-[100px]">
          <p class="font-semibold text-gray-900">{{ rec.price }}</p>
          <p class="text-xs text-gray-500">{{ rec.date }}</p>
        </div>

        <!-- Location -->
        <div class="text-sm text-gray-600 min-w-[100px]">
          {{ rec.location }}
        </div>

        <!-- Actions Menu -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
              <span class="text-xl text-gray-400">⋯</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem class="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>
