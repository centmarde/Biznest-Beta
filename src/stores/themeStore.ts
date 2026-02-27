import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { professionalPalette } from '@/themes/professional'

export type ThemeMode = 'light' | 'dark'

export interface ThemeState {
  mode: ThemeMode
  palette: typeof professionalPalette
}

export const useThemeStore = defineStore('theme', () => {
  // State
  const mode = ref<ThemeMode>('light')
  const palette = ref(professionalPalette)

  // Getters
  const currentTheme = computed(() => ({
    mode: mode.value,
    palette: palette.value
  }))

  const isDark = computed(() => mode.value === 'dark')
  const isLight = computed(() => mode.value === 'light')

  // Current color scheme based on mode
  const colors = computed(() => {
    const baseColors = palette.value
    
    if (mode.value === 'dark') {
      return {
        primary: baseColors.primary.deepNavy,
        secondary: baseColors.neutral.charcoalGray,
        accent: baseColors.accent.softGold,
        background: baseColors.neutral.charcoalGray,
        surface: baseColors.primary.deepNavy,
        text: baseColors.primary.pureWhite,
        textSecondary: baseColors.accent.lightBlue,
      }
    } else {
      return {
        primary: baseColors.primary.deepNavy,
        secondary: baseColors.accent.lightBlue,
        accent: baseColors.accent.softGold,
        background: baseColors.primary.pureWhite,
        surface: baseColors.neutral.offWhite,
        text: baseColors.neutral.charcoalGray,
        textSecondary: baseColors.primary.deepNavy,
      }
    }
  })

  // Actions
  const setTheme = (newMode: ThemeMode) => {
    mode.value = newMode
    applyThemeToDOM()
    saveThemeToStorage()
  }

  const toggleTheme = () => {
    const newMode = mode.value === 'light' ? 'dark' : 'light'
    setTheme(newMode)
  }

  const applyThemeToDOM = () => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(mode.value)
    
    // Apply CSS custom properties for the professional palette
    const currentColors = colors.value
    root.style.setProperty('--color-primary', currentColors.primary)
    root.style.setProperty('--color-secondary', currentColors.secondary)
    root.style.setProperty('--color-accent', currentColors.accent)
    root.style.setProperty('--color-background', currentColors.background)
    root.style.setProperty('--color-surface', currentColors.surface)
    root.style.setProperty('--color-text', currentColors.text)
    root.style.setProperty('--color-text-secondary', currentColors.textSecondary)
    
    // Apply professional palette colors as CSS variables
    root.style.setProperty('--prof-navy', palette.value.primary.deepNavy)
    root.style.setProperty('--prof-white', palette.value.primary.pureWhite)
    root.style.setProperty('--prof-gold', palette.value.accent.softGold)
    root.style.setProperty('--prof-lightblue', palette.value.accent.lightBlue)
    root.style.setProperty('--prof-charcoal', palette.value.neutral.charcoalGray)
    root.style.setProperty('--prof-offwhite', palette.value.neutral.offWhite)
  }

  const saveThemeToStorage = () => {
    try {
      localStorage.setItem('biznest-theme', JSON.stringify({
        mode: mode.value,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }

  const loadThemeFromStorage = () => {
    try {
      const stored = localStorage.getItem('biznest-theme')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.mode && ['light', 'dark'].includes(parsed.mode)) {
          mode.value = parsed.mode
          return true
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
    }
    return false
  }

  const initializeTheme = () => {
    // Try to load from storage first
    const loaded = loadThemeFromStorage()
    
    // If no stored theme, detect system preference
    if (!loaded) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      mode.value = prefersDark ? 'dark' : 'light'
    }
    
    // Apply the theme to DOM
    applyThemeToDOM()
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const hasStoredPreference = localStorage.getItem('biznest-theme')
        if (!hasStoredPreference) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      })
    }
  }

  return {
    // State
    mode,
    palette,
    
    // Getters
    currentTheme,
    isDark,
    isLight,
    colors,
    
    // Actions
    setTheme,
    toggleTheme,
    applyThemeToDOM,
    initializeTheme,
    saveThemeToStorage,
    loadThemeFromStorage
  }
})
