<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface Props {
  title: string
  description: string
  isSelected?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  select: []
}>()
</script>

<template>
  <Card 
    class="cursor-pointer transition-all border-2"
    :class="{ 
      'shadow-[0_8px_16px_rgba(5,42,93,0.3)] border-[#052A5D]': isSelected,
      'shadow-[0_4px_12px_rgba(5,42,93,0.15)] border-gray-200 hover:shadow-[0_6px_16px_rgba(5,42,93,0.2)]': !isSelected
    }"
    @click="emit('select')"
  >
    <CardHeader class="pb-3">
      <CardTitle class="text-base font-bold text-foreground">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription class="text-xs text-muted-foreground leading-relaxed">
        {{ description }}
      </CardDescription>
    </CardContent>
  </Card>
</template>
