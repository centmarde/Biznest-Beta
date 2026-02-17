import { ref, computed, watch } from 'vue'

// Types
interface Location {
  lat: number
  lng: number
}

interface LocationData {
  coordinates: Location
  address?: string
  placeId?: string
  formattedAddress?: string
}

interface MapSettings {
  zoom: number
  center: Location
  mapType: string
  enableZoomControl: boolean
  enableMapTypeControl: boolean
  enableStreetViewControl: boolean
  enableFullscreenControl: boolean
}

interface GmapFetchState {
  currentLocation: LocationData | null
  isLoading: boolean
  error: string | null
  mapSettings: MapSettings
  apiKey: string
}

export function useGmapFetch() {
  // Reactive state
  const state = ref<GmapFetchState>({
    currentLocation: null,
    isLoading: false,
    error: null,
    mapSettings: {
      zoom: 12,
      center: { lat: 14.5995, lng: 120.9842 }, // Manila, Philippines fallback
      mapType: 'roadmap',
      enableZoomControl: true,
      enableMapTypeControl: true,
      enableStreetViewControl: true,
      enableFullscreenControl: true
    },
    apiKey: import.meta.env.VITE_PUBLIC_GMAP_API || ''
  })

  // Flag to track if we've attempted to get user location
  const hasAttemptedUserLocation = ref(false)

  // Computed properties
  const coordinates = computed(() => state.value.currentLocation?.coordinates)
  const address = computed(() => state.value.currentLocation?.address)
  const isLocationSet = computed(() => !!state.value.currentLocation)
  const mapCenter = computed(() => state.value.currentLocation?.coordinates || state.value.mapSettings.center)

  // Initialize user location after map is ready
  const initializeUserLocationAfterMap = async (mapInstance?: any) => {
    if (hasAttemptedUserLocation.value) return
    
    hasAttemptedUserLocation.value = true
    
    try {
      const userLocation = await getCurrentLocation(true) // Silent mode
      // Update map settings center to user's location
      state.value.mapSettings.center = userLocation
      
      // If map instance is provided, update it immediately
      if (mapInstance) {
        mapInstance.setCenter(userLocation)
        mapInstance.setZoom(15) // Closer zoom for user location
      }
      
      console.log('Default location set to user location after map load:', userLocation)
      return userLocation
    } catch (error) {
      console.warn('Could not get user location after map load, using default (Manila):', error)
      // Keep Manila as fallback - already set in initial state
      return null
    }
  }

  // Set location by coordinates
  const setLocation = (location: Location, address?: string) => {
    state.value.currentLocation = {
      coordinates: location,
      address: address || state.value.currentLocation?.address,
      placeId: state.value.currentLocation?.placeId,
      formattedAddress: state.value.currentLocation?.formattedAddress
    }
    
    // Update map center to new location
    state.value.mapSettings.center = location
  }

  // Update address for current location
  const setAddress = (address: string, formattedAddress?: string) => {
    if (state.value.currentLocation) {
      state.value.currentLocation.address = address
      state.value.currentLocation.formattedAddress = formattedAddress || address
    }
  }

  // Clear current location
  const clearLocation = () => {
    state.value.currentLocation = null
    state.value.error = null
  }

  // Update map settings
  const updateMapSettings = (settings: Partial<MapSettings>) => {
    state.value.mapSettings = { ...state.value.mapSettings, ...settings }
  }

  // Set loading state
  const setLoading = (loading: boolean) => {
    state.value.isLoading = loading
  }

  // Set error state
  const setError = (error: string | null) => {
    state.value.error = error
    if (error) {
      state.value.isLoading = false
    }
  }

  // Get current user location using browser geolocation
  const getCurrentLocation = (silent: boolean = false): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      if (!silent) {
        setLoading(true)
        setError(null)
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          
          // Always set the location in state, regardless of silent mode
          setLocation(location)
          
          if (!silent) {
            setLoading(false)
          }
          
          resolve(location)
        },
        (error) => {
          let errorMessage = 'Unable to get your location. '
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.'
              break
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.'
              break
            default:
              errorMessage += 'An unknown error occurred.'
              break
          }
          
          if (!silent) {
            setError(errorMessage)
            setLoading(false)
          }
          
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  }

  // Reverse geocoding - get address from coordinates
  const getAddressFromCoordinates = async (location: Location): Promise<string> => {
    try {
      if (!window.google?.maps) {
        throw new Error('Google Maps not loaded')
      }

      const geocoder = new (window as any).google.maps.Geocoder()
      
      return new Promise((resolve, reject) => {
        geocoder.geocode(
          { location: location },
          (results: any[], status: string) => {
            if (status === 'OK' && results[0]) {
              const address = results[0].formatted_address
              setAddress(address, results[0].formatted_address)
              resolve(address)
            } else {
              reject(new Error('Geocoding failed: ' + status))
            }
          }
        )
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Geocoding failed'
      setError(errorMsg)
      throw error
    }
  }

  // Forward geocoding - get coordinates from address
  const getCoordinatesFromAddress = async (address: string): Promise<Location> => {
    try {
      if (!window.google?.maps) {
        throw new Error('Google Maps not loaded')
      }

      const geocoder = new (window as any).google.maps.Geocoder()
      
      return new Promise((resolve, reject) => {
        geocoder.geocode(
          { address: address },
          (results: any[], status: string) => {
            if (status === 'OK' && results[0]) {
              const location = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
              setLocation(location, address)
              resolve(location)
            } else {
              reject(new Error('Address not found: ' + status))
            }
          }
        )
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Address search failed'
      setError(errorMsg)
      throw error
    }
  }

  // Calculate distance between two points (in kilometers)
  const calculateDistance = (point1: Location, point2: Location): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180
    const dLon = (point2.lng - point1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Format coordinates for display
  const formatCoordinates = (location: Location, precision: number = 6): string => {
    return `${location.lat.toFixed(precision)}, ${location.lng.toFixed(precision)}`
  }

  // Validate coordinates
  const isValidCoordinates = (location: Location): boolean => {
    return (
      typeof location.lat === 'number' &&
      typeof location.lng === 'number' &&
      location.lat >= -90 && location.lat <= 90 &&
      location.lng >= -180 && location.lng <= 180
    )
  }

  // Watch for location changes and auto-geocode if needed
  watch(
    () => state.value.currentLocation?.coordinates,
    async (newCoords, oldCoords) => {
      if (newCoords && (!oldCoords || 
          newCoords.lat !== oldCoords.lat || 
          newCoords.lng !== oldCoords.lng)) {
        
        // Auto-geocode if address is not set
        if (!state.value.currentLocation?.address) {
          try {
            await getAddressFromCoordinates(newCoords)
          } catch (error) {
            console.warn('Auto-geocoding failed:', error)
          }
        }
      }
    },
    { deep: true }
  )

  return {
    // State
    state: state.value,
    hasAttemptedUserLocation,
    
    // Computed
    coordinates,
    address,
    isLocationSet,
    mapCenter,
    
    // Actions
    setLocation,
    setAddress,
    clearLocation,
    updateMapSettings,
    setLoading,
    setError,
    
    // Location services
    getCurrentLocation,
    getAddressFromCoordinates,
    getCoordinatesFromAddress,
    initializeUserLocationAfterMap,
    
    // Utilities
    calculateDistance,
    formatCoordinates,
    isValidCoordinates
  }
}
