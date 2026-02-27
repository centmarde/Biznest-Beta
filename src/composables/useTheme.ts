import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore'
import type { ThemeMode } from '@/stores/themeStore'

/**
 * Composable for easy theme management in Vue components
 * Provides reactive theme state and actions
 */
export const useTheme = () => {
  const themeStore = useThemeStore()
  
  // Reactive state from the store
  const {
    mode,
    palette,
    currentTheme,
    isDark,
    isLight,
    colors
  } = storeToRefs(themeStore)
  
  // Actions from the store
  const {
    setTheme,
    toggleTheme,
    initializeTheme
  } = themeStore
  
  /**
   * Get a specific color from the professional palette
   * @param colorPath - Dot notation path to the color (e.g., 'primary.deepNavy', 'accent.softGold')
   * @returns The hex color value
   */
  const getColor = (colorPath: string): string => {
    const keys = colorPath.split('.')
    let current: any = palette.value
    
    for (const key of keys) {
      current = current?.[key]
      if (current === undefined) {
        console.warn(`Color path '${colorPath}' not found in professional palette`)
        return '#000000' // fallback color
      }
    }
    
    return current
  }
  
  /**
   * Get CSS variable name for a professional color
   * @param colorName - The color name (navy, gold, lightblue, charcoal, offwhite, white)
   * @returns CSS variable name
   */
  const getProfCSSVar = (colorName: string): string => {
    return `var(--prof-${colorName})`
  }
  
  /**
   * Apply custom styles based on current theme mode
   * @param lightStyles - Styles for light mode
   * @param darkStyles - Styles for dark mode
   * @returns Computed styles object
   */
  const getThemeStyles = (lightStyles: Record<string, any>, darkStyles: Record<string, any> = {}) => {
    return isDark.value ? { ...lightStyles, ...darkStyles } : lightStyles
  }
  
  return {
    // Reactive state
    mode,
    palette,
    currentTheme,
    isDark,
    isLight,
    colors,
    
    // Actions
    setTheme,
    toggleTheme,
    initializeTheme,
    
    // Utility functions
    getColor,
    getProfCSSVar,
    getThemeStyles
  }
}

export type { ThemeMode }
