<script setup lang="ts">
import { useRouter } from "vue-router";
import BusinessOwnerWidget from "./components/BusinessOwnerWidget.vue";

// Router for navigation
const router = useRouter();

// Handle option selection from widget
const handleOptionSelection = (
  option: "have-lot" | "have-business" | "need-space" | "need-supplier",
) => {
  console.log("Selected business option:", option);
  console.log("Option label:", getOptionLabel(option));

  // Navigate based on option type
  if (
    option === "have-lot" ||
    option === "need-space" ||
    option === "have-business"
  ) {
    // Navigate to the map location picker for location-related options
    router.push({
      name: "gmap-location-picker",
      query: { businessType: option },
    });
  } else if (option === "need-supplier") {
    // Navigate to supplier search/location picker to find suppliers nearby
    router.push({
      name: "gmap-location-picker",
      query: { businessType: option, mode: "supplier-search" },
    });
  } else {
    // Fallback for any future options
    console.log("Option selected, implement specific flow for:", option);
  }
};

// Helper function to get option label
const getOptionLabel = (option: string): string => {
  const labels = {
    "have-lot": "I have a lot",
    "have-business": "I have a business, but no lot",
    "need-space": "I need space rental/lot for sale",
    "need-supplier": "I need supplier for my business",
  };
  return labels[option as keyof typeof labels] || option;
};
</script>

<template>
  <div
    class="h-screen bg-prof-lightblue flex items-center justify-center overflow-hidden"
  >
    <BusinessOwnerWidget @option-selected="handleOptionSelection" />
  </div>
</template>
