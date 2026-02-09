<script setup lang="ts">
import { useLandingFeatures } from "../composables/useLandingFeatures"
import { Card, CardContent } from "@/components/ui/card"
import { TypographyH3, TypographyP, TypographyLead, TypographyH1 } from "@/components/ui/typography"

const { features } = useLandingFeatures()
</script>

<template>
  <!-- Feature Section with Same Background as LandingView -->
  <TypographyH1 class="text-center text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
    CUM SEE OUR FEATURES
  </TypographyH1>
  <section class="relative w-full bg-background py-16">
    <div class="container mx-auto px-6">
      <div class="w-full">
        <!-- White Card Container -->
        <Card class="bg-white border-none shadow-2xl">
          <CardContent class="p-8 md:p-16">
            <!-- Section Header -->
            <div class="mb-2">
              <TypographyLead class="text-blue-600 font-semibold">
                Improve your workflow
              </TypographyLead>
              <TypographyH1 class="mt-2 text-black dark:text-navy">
                Biznest Features
              </TypographyH1>
            </div>

            <!-- Content Grid: Features (2 col) + Image -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Features Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="feature in features"
                  :key="feature.title"
                  class="flex gap-4"
                >
                  <!-- Icon/Checkbox -->
                  <div class="shrink-0">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                      ✓
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="min-w-0">
                    <TypographyH3 class="text-base font-semibold text-black">
                      {{ feature.title }}
                    </TypographyH3>
                    <TypographyP class="text-sm mt-1 text-black">
                      {{ feature.description }}
                    </TypographyP>
                  </div>
                </div>
              </div>

              <!-- Feature Image - Full Size -->
              <div class="relative w-[90%] h-[90%] mx-auto">
                <img 
                  src="/landingfeatures.png" 
                  alt="Professional using Biznest Platform" 
                  class="w-[90%] h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>