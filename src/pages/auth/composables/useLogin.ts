import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAlert } from '@/components/AlertContext.vue'

export function useLogin() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { addAlert } = useAlert()

  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)

  const login = async () => {
    authStore.clearError()

    if (!email.value || !password.value) {
      addAlert({
        title: 'Validation Error',
        description: 'Please enter your email and password.',
        variant: 'destructive'
      })
      return
    }

    const success = await authStore.login({
      email: email.value,
      password: password.value
    })

    if (success) {
      addAlert({
        title: 'Welcome back!',
        description: 'Login successful. Redirecting...',
        variant: 'success'
      })
      router.push('/home')
    } else {
      addAlert({
        title: 'Login Failed',
        description: authStore.error || 'Invalid email or password.',
        variant: 'destructive'
      })
    }
  }

  const loginWithGoogle = () => {
    console.log('Login with Google')
    // Implement Google OAuth logic here
  }

  const loginWithFacebook = () => {
    console.log('Login with Facebook')
    // Implement Facebook OAuth logic here
  }

  const loginWithApple = () => {
    console.log('Login with Apple')
    // Implement Apple OAuth logic here
  }

  const goToRegister = () => {
    router.push('/signup')
  }

  const forgotPassword = () => {
    console.log('Forgot password clicked')
    // Implement forgot password logic here
  }

  return {
    email,
    password,
    rememberMe,
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithApple,
    goToRegister,
    forgotPassword
  }
}
