<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

interface PaginationEmits {
  (e: "update:currentPage", page: number): void;
}

const props = defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const startItem = computed(() =>
  props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.itemsPerPage + 1
);

const endItem = computed(() =>
  Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
);

const canGoPrevious = computed(() => props.currentPage > 1);
const canGoNext = computed(() => props.currentPage < totalPages.value);

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:currentPage", page);
  }
};

const previousPage = () => {
  if (canGoPrevious.value) {
    goToPage(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (canGoNext.value) {
    goToPage(props.currentPage + 1);
  }
};

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = props.currentPage;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 3; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-4 px-2"
  >
    <!-- Items Info -->
    <div class="text-sm text-muted-foreground">
      Showing
      <span class="font-semibold text-foreground">{{ startItem }}</span>
      to
      <span class="font-semibold text-foreground">{{ endItem }}</span>
      of
      <span class="font-semibold text-foreground">{{ totalItems }}</span>
      results
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <Button
        variant="outline"
        size="sm"
        :disabled="!canGoPrevious"
        class="h-8 w-8 p-0"
        @click="previousPage"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <template v-for="(page, index) in visiblePages" :key="index">
          <span
            v-if="page === '...'"
            class="px-2 text-muted-foreground"
          >
            ...
          </span>
          <Button
            v-else
            variant="outline"
            size="sm"
            class="h-8 w-8 p-0 transition-all duration-200"
            :class="
              page === currentPage
                ? 'bg-prof-navy text-prof-offwhite border-prof-navy hover:bg-prof-navy/90 dark:bg-prof-gold dark:text-prof-navy dark:border-prof-gold dark:hover:bg-prof-gold/90'
                : 'hover:bg-muted'
            "
            @click="goToPage(page as number)"
          >
            {{ page }}
          </Button>
        </template>
      </div>

      <!-- Next Button -->
      <Button
        variant="outline"
        size="sm"
        :disabled="!canGoNext"
        class="h-8 w-8 p-0"
        @click="nextPage"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
