import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  password?: string
  avatar?: string
  role: 'business-owner' | 'LGU' | 'admin'
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
  role: 'business-owner' | 'LGU' | 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  // State - using ref()
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed - using computed()
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')
  const userRole = computed(() => user.value?.role || null)

  // Functions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Create a separate axios instance for static files served by Vite dev server
      const staticAxios = axios.create({
        baseURL: window.location.origin,
        timeout: 10000,
      })

      // Fetch users from the public directory using axios
      // Files in public/ are served directly by Vite dev server
      const response = await staticAxios.get('/data/user.json')
      const users = response.data.users || []

      // Find user with matching email and password
      const foundUser = users.find((u: User) => 
        u.email === credentials.email && u.password === credentials.password
      )

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      // Store user
      user.value = foundUser

      // Persist to localStorage
      localStorage.setItem('authUser', JSON.stringify(foundUser))

      return true
    } catch (err: any) {
      error.value = err.message || 'Login failed. Please check your credentials.'
      user.value = null
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    // Clear state
    user.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('authUser')
  }

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Create a separate axios instance for static files served by Vite dev server
      const staticAxios = axios.create({
        baseURL: window.location.origin,
        timeout: 10000,
      })

      // Fetch users from the public directory using axios
      const response = await staticAxios.get('/data/user.json')
      const users = response.data.users || []

      // Check if user already exists
      const existingUser = users.find((u: User) => u.email === credentials.email)

      if (existingUser) {
        throw new Error('An account with this email already exists')
      }

      // For simplicity, we'll just simulate registration success
      // In a real app, you'd save to backend
      const newUser: User = {
        id: Date.now().toString(),
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role
      }

      // Store user for auto-login
      user.value = newUser

      // Persist to localStorage
      localStorage.setItem('authUser', JSON.stringify(newUser))

      return true
    } catch (err: any) {
      if (err.message === 'An account with this email already exists') {
        error.value = err.message
      } else {
        error.value = err.message || 'Registration failed. Please try again.'
      }
      user.value = null
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkAuth = (): boolean => {
    const storedUser = localStorage.getItem('authUser')

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        return true
      } catch (err) {
        logout()
        return false
      }
    }
    return false
  }

  const clearError = (): void => {
    error.value = null
  }

  const updateUser = (updatedUser: User): void => {
    user.value = updatedUser
    localStorage.setItem('authUser', JSON.stringify(updatedUser))
  }

  // Initialize auth state from localStorage
  checkAuth()

  return {
    // State
    user,
    isLoading,
    error,
    // Computed
    isAuthenticated,
    userName,
    userEmail,
    userRole,
    // Functions
    login,
    register,
    logout,
    checkAuth,
    clearError,
    updateUser
  }
})

