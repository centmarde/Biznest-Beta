<script setup lang="ts">
import { ref } from 'vue'
import BusinessNavbar from './components/BusinessNavbar.vue'
import SideNav from './components/SideNav.vue'
import ProfileWelcome from './components/ProfileWelcome.vue'
import TileOption from './components/TileOption.vue'
import RecommendationsTable from './components/RecommendationsTable.vue'
import { useMockBusinessData } from './composables/useBusinessData'

const { tileOptions, recommendations } = useMockBusinessData()
const selectedTile = ref<string | null>(null)

const selectTile = (id: string) => {
  selectedTile.value = id
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Top Navbar -->
    <BusinessNavbar />

    <!-- Profile Welcome Card - Full Width -->
    <div class="px-4 pt-2 pb-0">
      <ProfileWelcome />
    </div>

    <div class="flex">
      <!-- Sidebar -->
      <SideNav />

      <!-- Main Content -->
      <main class="flex-1 p-8 pl-4">
        <!-- Content Area -->
        <div class="bg-card rounded-lg shadow-sm p-8 pb-6">
          <!-- Header -->
          <div class="mb-8 text-center">
            <TypographyH1 class="uppercase mb-2">
              WHAT BEST DESCRIBES YOUR CURRENT BUSINESS SITUATION?
            </TypographyH1>
            <p class="text-sm text-gray-600">Select one option below</p>
          </div>

          <!-- Tile Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TileOption
              v-for="tile in tileOptions"
              :key="tile.id"
              :title="tile.title"
              :description="tile.description"
              :is-selected="selectedTile === tile.id"
              @select="selectTile(tile.id)"
            />
          </div>
        </div>

        <!-- Recommendations Table -->
        <RecommendationsTable :recommendations="recommendations" />
      </main>
    </div>
  </div>
</template>
