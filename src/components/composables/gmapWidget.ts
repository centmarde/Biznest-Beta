/**
 * Google Maps Widget Utilities
 * Functions extracted from GmapWidget.vue for better code organization and reusability
 */

// Types
export interface MapLocation {
  lat: number
  lng: number
}

export interface MapOptions {
  center: MapLocation
  zoom: number
  mapTypeId: string
  disableDefaultUI: boolean
  zoomControl: boolean
  mapTypeControl: boolean
  streetViewControl: boolean
  fullscreenControl: boolean
  styles?: any[]
}

export interface MarkerOptions {
  position: MapLocation
  map: any
  title?: string
  icon?: {
    url: string
    scaledSize: any
  }
  animation?: any
}

// Google Maps API Management
export class GoogleMapsAPIManager {
  private static instance: GoogleMapsAPIManager
  private isLoaded = false
  private loadingPromise: Promise<void> | null = null

  static getInstance(): GoogleMapsAPIManager {
    if (!GoogleMapsAPIManager.instance) {
      GoogleMapsAPIManager.instance = new GoogleMapsAPIManager()
    }
    return GoogleMapsAPIManager.instance
  }

  async loadAPI(apiKey: string, libraries: string[] = ['places', 'drawing']): Promise<void> {
    // If already loaded, return immediately
    if (this.isLoaded && (window as any).google?.maps) {
      return Promise.resolve()
    }

    // If currently loading, return the existing promise
    if (this.loadingPromise) {
      return this.loadingPromise
    }

    // Create new loading promise
    this.loadingPromise = new Promise((resolve, reject) => {
      if (!apiKey) {
        reject(new Error('Google Maps API key not found. Please check your .env file.'))
        return
      }

      // Create global callback function
      const callbackName = `initGoogleMaps_${Date.now()}`
      ;(window as any)[callbackName] = () => {
        this.isLoaded = true
        delete (window as any)[callbackName]
        resolve()
      }

      // Create script element
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&callback=${callbackName}`
      script.async = true
      script.defer = true
      
      script.onerror = () => {
        delete (window as any)[callbackName]
        this.loadingPromise = null
        reject(new Error('Failed to load Google Maps API. Please check your internet connection.'))
      }

      document.head.appendChild(script)
    })

    return this.loadingPromise
  }

  isAPILoaded(): boolean {
    return this.isLoaded && !!(window as any).google?.maps
  }
}

// Map Creation Utilities
export function createMapOptions(props: {
  center?: MapLocation
  zoom?: number
  mapTypeId?: string
  disableDefaultUI?: boolean
  enableZoomControl?: boolean
  enableMapTypeControl?: boolean
  enableStreetViewControl?: boolean
  enableFullscreenControl?: boolean
}): MapOptions {
  const defaultCenter = { lat: 14.5995, lng: 120.9842 } // Manila, Philippines
  
  return {
    center: props.center || defaultCenter,
    zoom: props.zoom || 12,
    mapTypeId: props.mapTypeId || 'roadmap',
    disableDefaultUI: props.disableDefaultUI || false,
    zoomControl: props.enableZoomControl !== false,
    mapTypeControl: props.enableMapTypeControl !== false,
    streetViewControl: props.enableStreetViewControl !== false,
    fullscreenControl: props.enableFullscreenControl !== false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "on" }]
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#0a2540" }] // prof-navy color
      }
    ]
  }
}

export function createGoogleMapInstance(container: HTMLElement, options: MapOptions): any {
  if (!(window as any).google?.maps) {
    throw new Error('Google Maps API not loaded')
  }

  const googleMapsOptions = {
    center: options.center,
    zoom: options.zoom,
    mapTypeId: (window as any).google.maps.MapTypeId[options.mapTypeId.toUpperCase()],
    disableDefaultUI: options.disableDefaultUI,
    zoomControl: options.zoomControl,
    mapTypeControl: options.mapTypeControl,
    streetViewControl: options.streetViewControl,
    fullscreenControl: options.fullscreenControl,
    styles: options.styles
  }

  return new (window as any).google.maps.Map(container, googleMapsOptions)
}

// Marker Management
export function createMarker(options: MarkerOptions): any {
  if (!(window as any).google?.maps) {
    throw new Error('Google Maps API not loaded')
  }

  const markerOptions: any = {
    position: options.position,
    map: options.map,
    title: options.title || 'Selected Location'
  }

  if (options.icon) {
    markerOptions.icon = {
      url: options.icon.url,
      scaledSize: new (window as any).google.maps.Size(32, 32)
    }
  } else {
    // Use default red marker if no custom icon is provided
    markerOptions.icon = {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new (window as any).google.maps.Size(32, 32)
    }
  }

  if (options.animation) {
    markerOptions.animation = options.animation
  } else {
    markerOptions.animation = (window as any).google.maps.Animation.DROP
  }

  return new (window as any).google.maps.Marker(markerOptions)
}

export function removeMarker(marker: any): void {
  if (marker) {
    marker.setMap(null)
  }
}

export function updateMarkerPosition(marker: any, position: MapLocation): void {
  if (marker && position) {
    marker.setPosition(position)
  }
}

// Map Control Functions
export function centerMapOnLocation(map: any, location: MapLocation, zoom?: number): void {
  if (map && location) {
    map.setCenter(location)
    if (zoom !== undefined) {
      map.setZoom(zoom)
    }
  }
}

export function setMapZoom(map: any, zoom: number): void {
  if (map) {
    map.setZoom(zoom)
  }
}

// Event Handlers Factory
export function createMapClickHandler(
  onLocationSelected: (location: MapLocation) => void,
  onMapClicked?: (location: MapLocation) => void
) {
  return (event: any) => {
    const location: MapLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    
    onLocationSelected(location)
    
    if (onMapClicked) {
      onMapClicked(location)
    }
  }
}

// Validation Functions
export function isValidLocation(location: any): location is MapLocation {
  return (
    location &&
    typeof location === 'object' &&
    typeof location.lat === 'number' &&
    typeof location.lng === 'number' &&
    !isNaN(location.lat) &&
    !isNaN(location.lng) &&
    location.lat >= -90 &&
    location.lat <= 90 &&
    location.lng >= -180 &&
    location.lng <= 180
  )
}

export function isValidZoom(zoom: number): boolean {
  return typeof zoom === 'number' && !isNaN(zoom) && zoom >= 0 && zoom <= 21
}

// Utility Functions
export function generateUniqueCallbackName(): string {
  return `gmapCallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function cleanupGlobalCallback(callbackName: string): void {
  if ((window as any)[callbackName]) {
    delete (window as any)[callbackName]
  }
}

// Error Handling
export class GoogleMapsError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'GoogleMapsError'
  }
}

export function createErrorHandler(onError: (error: string) => void) {
  return (error: Error | string) => {
    const errorMessage = error instanceof Error ? error.message : error
    console.error('Google Maps Error:', errorMessage)
    onError(errorMessage)
  }
}

// Constants
export const DEFAULT_MAP_CONFIG = {
  center: { lat: 14.5995, lng: 120.9842 }, // Manila, Philippines
  zoom: 12,
  mapTypeId: 'roadmap',
  libraries: ['places', 'drawing']
} as const

export const MAP_ZOOM_LEVELS = {
  WORLD: 1,
  COUNTRY: 5,
  CITY: 10,
  DISTRICT: 12,
  STREET: 15,
  BUILDING: 18,
  ROOM: 21
} as const

// TypeScript declarations for Google Maps
declare global {
  interface Window {
    google: any;
  }
  
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: any);
        setCenter(latLng: any): void;
        setZoom(zoom: number): void;
        addListener(eventName: string, handler: Function): void;
      }
      
      class Marker {
        constructor(opts?: any);
        setMap(map: any): void;
        setPosition(position: any): void;
      }
      
      class Size {
        constructor(width: number, height: number);
      }
      
      enum MapTypeId {
        ROADMAP = "roadmap",
        SATELLITE = "satellite",
        HYBRID = "hybrid",
        TERRAIN = "terrain"
      }
      
      namespace Animation {
        const DROP: any;
        const BOUNCE: any;
      }
      
      interface MapOptions {
        center?: any;
        zoom?: number;
        mapTypeId?: any;
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        mapTypeControl?: boolean;
        scaleControl?: boolean;
        streetViewControl?: boolean;
        rotateControl?: boolean;
        fullscreenControl?: boolean;
        styles?: any[];
      }
    }
  }
}
