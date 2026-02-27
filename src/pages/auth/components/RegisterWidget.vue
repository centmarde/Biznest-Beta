<template>
  <Card class="w-full max-w-3xl mx-auto shadow-lg">
    <CardContent class="p-0">
      <div class="flex flex-col md:flex-row">

        <!-- Left Side: Register Form -->
        <div class="flex-1 p-8 space-y-5">
          <div>
            <TypographyH2 class="text-2xl font-bold text-foreground">Sign Up</TypographyH2>
            <TypographyLead class="text-sm text-prof-blue font-medium mt-1">
              Create your Biznest account - start your journey
            </TypographyLead>
          </div>



          <form @submit.prevent="register" class="space-y-4">
            <div class="space-y-1">
              <Label for="fullName">Full Name</Label>
              <Input
                id="fullName"
                v-model="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                class="w-full"
                @input="clearError"
              />
            </div>

            <div class="space-y-1">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
                class="w-full"
                @input="clearError"
              />
            </div>

            <div class="space-y-1">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="Create a password"
                required
                class="w-full"
                @input="clearError"
              />
            </div>

            <div class="space-y-1">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                class="w-full"
                @input="clearError"
              />
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="agreeToTerms"
                v-model="agreeToTerms"
                type="checkbox"
                required
                class="h-4 w-4 rounded border-input"
              />
              <Label for="agreeToTerms" class="text-sm font-normal">
                I agree to the
                <span class="text-prof-blue font-semibold cursor-pointer hover:underline">Terms & Conditions</span>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-prof-navy hover:bg-prof-navy/90 dark:bg-primary dark:hover:bg-primary/90 disabled:opacity-50"
            >
              {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
            </Button>
          </form>

          <TypographyP class="text-center text-sm text-muted-foreground">
            Already have an account?
            <span
              class="text-prof-blue font-semibold cursor-pointer hover:underline ml-1"
              @click="goToLogin"
            >Sign in</span>
          </TypographyP>
        </div>

        <!-- Divider -->
        <Separator orientation="vertical" class="hidden md:block self-stretch" />

        <!-- Right Side: Quick Sign Up -->
        <div class="flex-1 p-8 space-y-5 flex flex-col justify-center">
          <div class="text-center">
            <TypographyH3 class="text-xl font-bold text-foreground">Quick Sign Up</TypographyH3>
            <TypographyLead class="text-sm text-prof-blue font-medium mt-1">
              Continue with your social account
            </TypographyLead>
          </div>

          <div class="space-y-3">
            <!-- Google -->
            <Button
              variant="outline"
              class="w-full flex items-center gap-3 justify-start px-4"
              @click="signUpWithGoogle"
            >
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="font-semibold">Continue with Google</span>
            </Button>

            <!-- Facebook -->
            <Button
              variant="outline"
              class="w-full flex items-center gap-3 justify-start px-4"
              @click="signUpWithFacebook"
            >
              <svg class="h-5 w-5 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="font-semibold">Continue with Facebook</span>
            </Button>

            <!-- Apple -->
            <Button
              variant="outline"
              class="w-full flex items-center gap-3 justify-start px-4"
              @click="signUpWithApple"
            >
              <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span class="font-semibold">Continue with Apple</span>
            </Button>
          </div>
        </div>

      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP
} from '@/components/ui/typography'
import { useRealtimeValidation, validateForm } from '@/utils/validators'
import { useAlert } from '@/components/AlertContext.vue'
// import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const { addAlert } = useAlert()
const { validateEmail, validatePassword, validateFullName, validateTermsAgreement, createPasswordConfirmationValidator } = useRealtimeValidation()

// Form state
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const isLoading = ref(false)
const error = ref('')

// Realtime validation for each field
const fullNameValidation = computed(() => validateFullName(fullName.value))
const emailValidation = computed(() => validateEmail(email.value))
const passwordValidation = computed(() => validatePassword(password.value))
const confirmPasswordValidation = computed(() => 
  createPasswordConfirmationValidator(password.value)(confirmPassword.value)
)
const termsValidation = computed(() => validateTermsAgreement(agreeToTerms.value))

// Check if form is valid
const isFormValid = computed(() => {
  return fullNameValidation.value.isValid &&
         emailValidation.value.isValid &&
         passwordValidation.value.isValid &&
         confirmPasswordValidation.value.isValid &&
         termsValidation.value.isValid
})

// Clear error when user starts typing
const clearError = () => {
  error.value = ''
}

// Form validation and registration function
const register = async () => {
  error.value = ''
  
  // Validate all fields
  const formData = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    terms: agreeToTerms.value
  }

  const validators = {
    fullName: validateFullName,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: createPasswordConfirmationValidator(password.value),
    terms: validateTermsAgreement
  }

  const { isValid, errors } = validateForm(formData, validators)

  if (!isValid) {
    // Show the first error using alert
    const firstError = Object.values(errors)[0] || 'Please check your input.'
    addAlert({
      title: 'Validation Error',
      description: firstError,
      variant: 'destructive'
    })
    return
  }

  isLoading.value = true

  try {
    // TODO: Implement actual registration logic when backend/database is ready
    // For now, simulate registration with default role as 'business-owner'
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message using alert
    addAlert({
      title: 'Registration Successful',
      description: 'Please login with your credentials.',
      variant: 'success'
    })
    
    router.push('/login')
  } catch (err) {
    addAlert({
      title: 'Registration Failed',
      description: 'Registration failed. Please try again.',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
}

// Social login functions (placeholder implementations)
const signUpWithGoogle = () => {
  addAlert({
    title: 'Feature Not Available',
    description: 'Google signup is not implemented yet.',
    variant: 'default'
  })
}

const signUpWithFacebook = () => {
  addAlert({
    title: 'Feature Not Available',
    description: 'Facebook signup is not implemented yet.',
    variant: 'default'
  })
}

const signUpWithApple = () => {
  addAlert({
    title: 'Feature Not Available',
    description: 'Apple signup is not implemented yet.',
    variant: 'default'
  })
}

// Navigation function
const goToLogin = () => {
  router.push('/login')
}
</script>