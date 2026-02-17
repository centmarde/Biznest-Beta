<template>
  <div class="w-full h-full">
    <!-- Loading State -->
    <div 
      v-if="isLoading || isWaitingForLocation" 
      class="flex items-center justify-center bg-prof-lightblue rounded-lg"
      :style="{ height: containerHeight }"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-prof-navy mx-auto mb-4"></div>
        <TypographyP class="text-prof-charcoal">{{ currentLoadingText }}</TypographyP>
      </div>
    </div>

    <!-- Error State -->
    <div 
      v-else-if="error" 
      class="flex items-center justify-center bg-red-50 rounded-lg border border-red-200"
      :style="{ height: containerHeight }"
    >
      <div class="text-center p-6">
        <div class="text-red-500 text-4xl mb-4">⚠️</div>
        <TypographyH3 class="text-red-700 mb-2">{{ errorTitle }}</TypographyH3>
        <TypographyP class="text-red-600 mb-4">{{ error }}</TypographyP>
        <button 
          v-if="showRetryButton"
          @click="retryInitialization"
          class="bg-prof-navy text-white px-4 py-2 rounded-lg hover:bg-prof-charcoal transition-colors duration-200"
        >
          {{ retryButtonText }}
        </button>
      </div>
    </div>

    <!-- Map Container -->
    <div 
      v-show="!isLoading && !error && !isWaitingForLocation"
      ref="mapContainer"
      class="w-full rounded-lg shadow-lg border border-prof-lightblue"
      :style="{ height: containerHeight, minHeight: containerHeight }"
      :class="mapContainerClass"
    ></div>

  
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { useGmapFetch } from '@/pages/BusinessOwnerPage/composables/gmapFetch'
import {
  GoogleMapsAPIManager,
  createMapOptions,
  createGoogleMapInstance,
  createMarker,
  removeMarker,
  centerMapOnLocation,
  setMapZoom,
  createMapClickHandler,
  createErrorHandler,
  MAP_ZOOM_LEVELS,
  type MapLocation
} from '@/components/composables/gmapWidget'

// Props
interface Props {
  // Initial location
  initialCenter?: MapLocation
  initialZoom?: number
  
  // Appearance
  height?: string
  containerClass?: string
  
  // Features
  enableLocationSelection?: boolean
  enableCurrentLocation?: boolean
  showControls?: boolean
  showRetryButton?: boolean
  showClearButton?: boolean
  
  // Text customization
  loadingText?: string
  errorTitle?: string
  retryButtonText?: string
  currentLocationButtonText?: string
  
  // Map settings
  disableDefaultUI?: boolean
  enableZoomControl?: boolean
  enableMapTypeControl?: boolean
  enableStreetViewControl?: boolean
  enableFullscreenControl?: boolean
  mapTypeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialCenter: () => ({ lat: 14.5995, lng: 120.9842 }), // Manila, Philippines
  initialZoom: 12,
  height: '24rem',
  containerClass: '',
  enableLocationSelection: true,
  enableCurrentLocation: true,
  showControls: true,
  showRetryButton: true,
  showClearButton: true,
  loadingText: 'Loading Google Maps...',
  errorTitle: 'Failed to load Google Maps',
  retryButtonText: 'Retry',
  currentLocationButtonText: 'My Location',
  disableDefaultUI: false,
  enableZoomControl: true,
  enableMapTypeControl: true,
  enableStreetViewControl: true,
  enableFullscreenControl: true,
  mapTypeId: 'roadmap'
})

// Emits
const emit = defineEmits<{
  locationSelected: [location: MapLocation]
  locationChanged: [location: MapLocation]
  addressFound: [address: string]
  mapReady: [map: any]
  mapClicked: [location: MapLocation]
  error: [error: string]
}>()

// Use the gmapFetch composable
const mapFetch = useGmapFetch()

// Local reactive references
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<any>(null)
const currentMarker = ref<any>(null)
const isLoading = ref(true)
const isWaitingForLocation = ref(true)
const error = ref<string | null>(null)
const isGettingLocation = ref(false)

// Computed properties
const containerHeight = computed(() => props.height)
const mapContainerClass = computed(() => props.containerClass)


// Loading text based on current state
const currentLoadingText = computed(() => {
  if (isWaitingForLocation.value) {
    return 'Getting your location...'
  }
  return props.loadingText
})

// Google Maps API key from environment variables
const apiKey = mapFetch.state.apiKey

// Initialize map function
const initializeMap = async () => {
  const errorHandler = createErrorHandler((errorMsg) => {
    error.value = errorMsg
    isLoading.value = false
    isWaitingForLocation.value = false
    emit('error', errorMsg)
  })

  try {
    isLoading.value = true
    isWaitingForLocation.value = true
    error.value = null

    if (!apiKey) {
      throw new Error('Google Maps API key not found. Please check your .env file.')
    }

    // First, try to get user location
    try {
      console.log('Attempting to get user location before loading map...')
      const userLocation = await mapFetch.getCurrentLocation(true) // Silent mode
      console.log('User location obtained:', userLocation)
      
      // Update map settings with user location
      mapFetch.updateMapSettings({
        center: userLocation,
        zoom: MAP_ZOOM_LEVELS.STREET // Closer zoom for user location
      })
      
      // Also set the location in the composable state
      mapFetch.setLocation(userLocation)
      
      isWaitingForLocation.value = false
      
    } catch (locationError) {
      console.warn('Could not get user location, using default center:', locationError)
      isWaitingForLocation.value = false
      // Continue with default location (Manila)
    }

    // Load Google Maps API using the manager
    const apiManager = GoogleMapsAPIManager.getInstance()
    
    // If already loaded, create map immediately
    if (apiManager.isAPILoaded()) {
      createMap()
      return
    }

    // Load the API
    await apiManager.loadAPI(apiKey, ['places', 'drawing'])
    createMap()

  } catch (err) {
    errorHandler(err instanceof Error ? err : new Error('An unexpected error occurred'))
  }
}

// Create the map instance
const createMap = () => {
  try {
    if (!mapContainer.value) {
      // Wait a bit for the DOM to be ready and try again
      setTimeout(() => {
        if (mapContainer.value) {
          createMap()
        } else {
          throw new Error('Map container element not found in DOM')
        }
      }, 100)
      return
    }

    // Update map settings from props and current location
    const currentCenter = mapFetch.mapCenter.value
    console.log('Creating map with center:', currentCenter)
    
    mapFetch.updateMapSettings({
      center: currentCenter,
      zoom: mapFetch.coordinates.value ? MAP_ZOOM_LEVELS.STREET : props.initialZoom,
      mapType: props.mapTypeId
    })

    // Create map options using utility function
    const mapOptions = createMapOptions({
      center: currentCenter,
      zoom: mapFetch.coordinates.value ? MAP_ZOOM_LEVELS.STREET : props.initialZoom,
      mapTypeId: props.mapTypeId,
      disableDefaultUI: props.disableDefaultUI,
      enableZoomControl: props.enableZoomControl,
      enableMapTypeControl: props.enableMapTypeControl,
      enableStreetViewControl: props.enableStreetViewControl,
      enableFullscreenControl: props.enableFullscreenControl
    })

    // Create map instance using utility function
    map.value = createGoogleMapInstance(mapContainer.value, mapOptions)

    // Add click listener for location selection
    if (props.enableLocationSelection) {
      const mapClickHandler = createMapClickHandler(
        (location) => handleMapClick(location),
        (location) => emit('mapClicked', location)
      )
      map.value.addListener('click', mapClickHandler)
    }

    isLoading.value = false
    isWaitingForLocation.value = false
    emit('mapReady', map.value)

    // If we have user location from initialization, add marker
    if (mapFetch.coordinates.value) {
      addMarker(mapFetch.coordinates.value)
      emit('locationSelected', mapFetch.coordinates.value)
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create map'
    isLoading.value = false
    isWaitingForLocation.value = false
    emit('error', error.value)
  }
}

// Handle map click
const handleMapClick = (location: MapLocation) => {
  mapFetch.setLocation(location)
  addMarker(location)
  emit('locationSelected', location)
  
  // Auto-geocode to get address
  if (window.google?.maps) {
    mapFetch.getAddressFromCoordinates(location)
      .then(address => {
        emit('addressFound', address)
      })
      .catch(err => console.warn('Geocoding failed:', err))
  }
}

// Add marker to map
const addMarker = (location: MapLocation) => {
  if (!map.value) return

  // Remove existing marker
  if (currentMarker.value) {
    removeMarker(currentMarker.value)
  }

  // Create new marker using utility function with red color
  currentMarker.value = createMarker({
    position: location,
    map: map.value,
    title: 'Selected Location'
    // No custom icon specified, will use default red marker
  })

  // Center map on marker
  centerMapOnLocation(map.value, location)
}

// Handle get current location
const handleGetCurrentLocation = async () => {
  if (isGettingLocation.value) return
  
  isGettingLocation.value = true
  
  try {
    const location = await mapFetch.getCurrentLocation()
    
    if (map.value) {
      centerMapOnLocation(map.value, location, MAP_ZOOM_LEVELS.BUILDING) // Closer zoom for current location
    }
    
    addMarker(location)
    emit('locationSelected', location)
    emit('locationChanged', location)
    
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to get current location'
    error.value = errorMsg
    emit('error', errorMsg)
  } finally {
    isGettingLocation.value = false
  }
}

// Clear selected location
const clearSelectedLocation = () => {
  mapFetch.clearLocation()
  
  if (currentMarker.value) {
    removeMarker(currentMarker.value)
    currentMarker.value = null
  }
  
  // Reset to initial center
  if (map.value) {
    centerMapOnLocation(map.value, props.initialCenter, props.initialZoom)
  }
}

// Retry initialization
const retryInitialization = () => {
  error.value = null
  isWaitingForLocation.value = true
  initializeMap()
}

// Expose methods to parent component
defineExpose({
  map: map,
  getMap: () => map.value,
  setCenter: (center: MapLocation) => {
    if (map.value) {
      centerMapOnLocation(map.value, center)
      mapFetch.setLocation(center)
    }
  },
  setZoom: (zoom: number) => {
    if (map.value) {
      setMapZoom(map.value, zoom)
    }
  },
  addMarker: addMarker,
  clearMarker: clearSelectedLocation,
  getCurrentLocation: handleGetCurrentLocation,
  mapFetch: mapFetch
})

// Watch for external location changes
watch(
  () => mapFetch.coordinates.value,
  (newLocation) => {
    if (newLocation && map.value) {
      addMarker(newLocation)
      emit('locationChanged', newLocation)
    }
  },
  { deep: true }
)

// Component lifecycle
onMounted(() => {
  // Ensure DOM is ready before initializing map
  setTimeout(() => {
    initializeMap()
  }, 50)
})

onUnmounted(() => {
  // Clean up marker
  if (currentMarker.value) {
    removeMarker(currentMarker.value)
  }
})
</script>

<style scoped>
/* Additional map-specific styles if needed */
.map-container {
  position: relative;
}
</style>
