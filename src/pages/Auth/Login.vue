<script setup lang="ts">
import { ref } from 'vue'
import LoginCard from '@/components/LoginCard.vue'

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

// OAuth login methods
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

// Email/Password login
const handleEmailLogin = () => {
  console.log('Email login:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
  // Implement email/password login logic here
}

// Utility methods
const forgotPassword = () => {
  console.log('Forgot password clicked')
  // Navigate to forgot password page or show modal
}

const goToSignUp = () => {
  console.log('Go to sign up clicked')
  // Navigate to sign up page
}
</script>

<template>
  <div class="min-h-screen h-screen overflow-hidden relative flex items-center justify-end">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/Buildings1.jpg')"
    >
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Login Card Container - Right Side -->
    <div class="relative z-10 w-full max-w-md mr-8 lg:mr-16 xl:mr-24">
      <LoginCard
        v-model:email="email"
        v-model:password="password"
        v-model:remember-me="rememberMe"
        @submit="handleEmailLogin"
        @forgot-password="forgotPassword"
        @login-with-google="loginWithGoogle"
        @login-with-facebook="loginWithFacebook"
        @login-with-apple="loginWithApple"
        @go-to-sign-up="goToSignUp"
      />
    </div>
  </div>
</template>
