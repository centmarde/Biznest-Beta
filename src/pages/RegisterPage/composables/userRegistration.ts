import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAlert } from '@/components/AlertContext.vue'

export interface User {
  id: number,
  name: string,
  password: string,
  email: string
}

export function useRegister() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { addAlert } = useAlert()

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
      addAlert({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive'
      })
      return
    }

    if (!agreeToTerms.value) {
      addAlert({
        title: 'Terms Required',
        description: 'You must agree to the terms and conditions.',
        variant: 'destructive'
      })
      return
    }

    // Validate password strength (optional)
    if (password.value.length < 6) {
      addAlert({
        title: 'Weak Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      })
      return
    }

    const success = await authStore.register({
      name: fullName.value,
      email: email.value,
      password: password.value
    })

    if (success) {
      console.log('Registration successful!')
      addAlert({
        title: 'Welcome!',
        description: 'Registration successful. Redirecting...',
        variant: 'success'
      })
      // Redirect to home page after successful registration
      router.push('/home')
    } else {
      console.error('Registration failed:', authStore.error)
      addAlert({
        title: 'Registration Failed',
        description: authStore.error || 'An error occurred during registration.',
        variant: 'destructive'
      })
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

