import { defineStore } from 'pinia'
import axios from 'axios' //soon to be supabase
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  password: string
}

export interface UsersResponse {
  users: User[]
}

export const useUsersStore = defineStore('users', () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getUserById = computed(() => {
    return (id: number) => users.value.find(user => user.id === id)
  })

  const getUserByEmail = computed(() => {
    return (email: string) => users.value.find(user => user.email === email)
  })

  const totalUsers = computed(() => users.value.length)

  const sortedUsers = computed(() => {
    return [...users.value].sort((a, b) => a.name.localeCompare(b.name))
  })

  // Actions
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get<UsersResponse>('/data/user.json')
      users.value = response.data.users
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      // Generate new ID based on existing users
      const newId = users.value.length > 0 
        ? Math.max(...users.value.map(u => u.id)) + 1 
        : 1

      const newUser: User = {
        id: newId,
        ...userData
      }

      users.value.push(newUser)
      
      // Note: In a real app, you'd send this to a backend API
      // For now, we're just updating the local state
      console.log('User added locally:', newUser)
      
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add user'
      throw err
    }
  }

  const updateUser = async (id: number, userData: Partial<Omit<User, 'id'>>) => {
    try {
      const userIndex = users.value.findIndex(user => user.id === id)
      
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const currentUser = users.value[userIndex]
      if (!currentUser) {
        throw new Error('User not found')
      }

      users.value[userIndex] = {
        id: currentUser.id,
        name: userData.name ?? currentUser.name,
        email: userData.email ?? currentUser.email,
        password: userData.password ?? currentUser.password
      }

      // Note: In a real app, you'd send this to a backend API
      console.log('User updated locally:', users.value[userIndex])
      
      return users.value[userIndex]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user'
      throw err
    }
  }

  const deleteUser = async (id: number) => {
    try {
      const userIndex = users.value.findIndex(user => user.id === id)
      
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUser = users.value.splice(userIndex, 1)[0]

      // Note: In a real app, you'd send this to a backend API
      console.log('User deleted locally:', deletedUser)
      
      return deletedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete user'
      throw err
    }
  }

  const validateUser = (email: string, password: string): User | null => {
    return users.value.find(user => 
      user.email === email && user.password === password
    ) || null
  }

  const clearError = () => {
    error.value = null
  }

  const refreshUsers = async () => {
    await fetchUsers()
  }

  // Initialize the store
  const initialize = async () => {
    if (users.value.length === 0) {
      await fetchUsers()
    }
  }

  return {
    // State
    users,
    loading,
    error,
    
    // Getters
    getUserById,
    getUserByEmail,
    totalUsers,
    sortedUsers,
    
    // Actions
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    validateUser,
    clearError,
    refreshUsers,
    initialize
  }
})