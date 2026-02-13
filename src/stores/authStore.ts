import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { axios } from '@/lib/axios'

interface User {
  id: number
  name: string
  email: string
}

interface LoginResponse {
  user: User
  token: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  // State - using ref()
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed - using computed()
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // Functions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // First, verify user exists with correct credentials
      const { data: users } = await axios.get<User[]>('/users', {
        params: {
          email: credentials.email,
          password: credentials.password
        }
      })

      if (users.length === 0) {
        throw new Error('Invalid email or password')
      }

      const foundUser = users[0]

      // Create login record (json-server will auto-generate token)
      const { data: loginData } = await axios.post<LoginResponse>('/login', {
        user: foundUser,
        token: `jwt-token-${Date.now()}` // Simple token generation
      })

      // Store user and token
      user.value = loginData.user
      token.value = loginData.token

      // Persist to localStorage
      localStorage.setItem('authToken', loginData.token)
      localStorage.setItem('authUser', JSON.stringify(loginData.user))

      return true
    } catch (err: any) {
      error.value = err.message || 'Login failed. Please check your credentials.'
      user.value = null
      token.value = null
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    // Clear state
    user.value = null
    token.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
  }

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      // Check if user already exists
      const { data: existingUsers } = await axios.get<User[]>('/users', {
        params: {
          email: credentials.email
        }
      })

      if (existingUsers.length > 0) {
        throw new Error('An account with this email already exists')
      }

      // Create new user
      const { data: newUser } = await axios.post<User>('/users', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })

      // Auto-login after registration
      const loginToken = `jwt-token-${Date.now()}`
      const { data: loginData } = await axios.post<LoginResponse>('/login', {
        user: newUser,
        token: loginToken
      })

      // Store user and token
      user.value = loginData.user
      token.value = loginData.token

      // Persist to localStorage
      localStorage.setItem('authToken', loginData.token)
      localStorage.setItem('authUser', JSON.stringify(loginData.user))

      return true
    } catch (err: any) {
      if (err.message === 'An account with this email already exists') {
        error.value = err.message
      } else {
        error.value = err.message || 'Registration failed. Please try again.'
      }
      user.value = null
      token.value = null
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkAuth = (): boolean => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
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
    token,
    isLoading,
    error,
    // Computed
    isAuthenticated,
    userName,
    userEmail,
    // Functions
    login,
    register,
    logout,
    checkAuth,
    clearError,
    updateUser
  }
})

