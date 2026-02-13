import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number,
  name: string,
  password: string,
  email: string
}

export function useRegister() {
  const router = useRouter()

  const fullName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const agreeToTerms = ref(false)

  const register = async () => {
    // Validation
    if (password.value !== confirmPassword.value) {
      console.error('Passwords do not match')
      return
    }

    if (!agreeToTerms.value) {
      console.error('You must agree to the terms and conditions')
      return
    }

    console.log('Email registration:', {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      agreeToTerms: agreeToTerms.value
    })
    // Implement registration logic here
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

