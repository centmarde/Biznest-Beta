<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { Recommendation } from '../composables/useBusinessData'
import { getStatusColor } from '../utils/helpers'

interface Props {
  recommendations: Recommendation[]
}

defineProps<Props>()
</script>

<template>
  <div class="mt-8 flex justify-center">
    <div class="w-full max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <template v-if="recommendations.length === 0">
              <TypographyH3 class="text-prof-navy">No Recommended Locations Yet</TypographyH3>
            </template>
            <template v-else>
              <TypographyP class="font-semibold text-prof-navy">Recommended Locations</TypographyP>
            </template>
          </div>
          <Button variant="link" class="text-[#0a2540]">
            See All →
          </Button>
        </div>

        <!-- No Results Message -->
        <div v-if="recommendations.length === 0" class="text-center py-8">
          <TypographyP class="text-prof-navy">
            Update your preferences or expand your area to see matches.
          </TypographyP>
        </div>

        <!-- Subtitle for when there are recommendations -->
        <div v-if="recommendations.length > 0" class="mb-4">
          <TypographyP class="text-prof-navy">
            Based on your preferences, here are some locations you might like.
          </TypographyP>
        </div>

        <!-- Recommendations List -->
        <div class="space-y-3">
            <div
            v-for="rec in recommendations"
            :key="rec.id"
            class="flex items-center gap-4 p-4 bg-white border border-foreground/40 rounded-lg hover:shadow-md transition-shadow"
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
              <TypographyP class="font-semibold text-foreground">{{ rec.title }}</TypographyP>
              <TypographyP class="text-foreground/60">{{ rec.subtitle }}</TypographyP>
            </div>

            <!-- Price -->
            <div class="text-right min-w-25">
              <TypographyP class="font-semibold text-gray-900">{{ rec.price }}</TypographyP>
              <TypographyP class="text-xs text-gray-500">{{ rec.date }}</TypographyP>
            </div>

            <!-- Location -->
            <div class="text-sm text-gray-600 min-w-25">
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
