import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export interface User {
  id: number,
  name: string,
  password: string,
  email: string
}

export function useRegister() {
  const router = useRouter()
  const authStore = useAuthStore()

  const fullName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const agreeToTerms = ref(false)

  const register = async () => {
    // Clear any previous errors
    authStore.clearError()

    // Validation
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }

    if (!agreeToTerms.value) {
      alert('You must agree to the terms and conditions')
      return
    }

    // Validate password strength (optional)
    if (password.value.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    const success = await authStore.register({
      name: fullName.value,
      email: email.value,
      password: password.value
    })

    if (success) {
      console.log('Registration successful!')
      // Redirect to home page after successful registration
      router.push('/home')
    } else {
      console.error('Registration failed:', authStore.error)
      alert(authStore.error || 'Registration failed')
    }
  }

  // OAuth registration methods
  const registerWithGoogle = () => {
    console.log('Register with Google')
    // Implement Google OAuth logic here
  }

  const registerWithFacebook = () => {
    console.log('Register with Facebook')
    // Implement Facebook OAuth logic here
  }

  const registerWithApple = () => {
    console.log('Register with Apple')
    // Implement Apple OAuth logic here
  }

  const goToLogin = () => {
    console.log('Go to login clicked')
    router.push('/signin')
  }

  return {
    fullName,
    email,
    password,
    confirmPassword,
    agreeToTerms,
    register,
    registerWithGoogle,
    registerWithFacebook,
    registerWithApple,
    goToLogin
  }
}

