<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader class="text-center pb-6">
      <CardTitle class="text-2xl font-bold">Create Account</CardTitle>
      <CardDescription>Join Biznest to start connecting with business opportunities</CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <!-- Registration Form -->
      <form @submit.prevent="register" class="space-y-4">
        <div class="space-y-2">
          <Label for="fullName">Full Name</Label>
          <Input
            id="fullName"
            v-model="fullName"
            type="text"
            placeholder="Enter your full name"
            required
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Create a password"
            required
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            class="w-full"
          />
        </div>

        <div class="flex items-start space-x-2">
          <input
            id="terms"
            v-model="agreeToTerms"
            type="checkbox"
            required
            class="h-4 w-4 rounded border-input mt-1"
          />
          <Label for="terms" class="text-sm font-normal leading-relaxed">
            I agree to the <Button variant="link" size="sm" class="p-0 h-auto">Terms of Service</Button> and <Button variant="link" size="sm" class="p-0 h-auto">Privacy Policy</Button>
          </Label>
        </div>

        <Button type="submit" size="lg" class="w-full bg-prof-navy hover:bg-prof-navy/90 dark:bg-primary dark:hover:bg-primary/90">
          Create Account
        </Button>
      </form>

      <!-- Separator with "OR" -->
      <div class="relative">
        <Separator />
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="bg-background px-4 text-sm text-muted-foreground">OR</span>
        </div>
      </div>

      <!-- OAuth Registration Options - Inline with logos only -->
      <div class="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          class="h-10 w-10 hover:bg-accent"
          @click="registerWithGoogle"
          title="Continue with Google"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </Button>

        <Separator orientation="vertical" class="h-8" />

        <Button
          variant="ghost"
          size="icon"
          class="h-10 w-10 hover:bg-accent"
          @click="registerWithFacebook"
          title="Continue with Facebook"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </Button>

        <Separator orientation="vertical" class="h-8" />

        <Button
          variant="ghost"
          size="icon"
          class="h-10 w-10 hover:bg-accent"
          @click="registerWithApple"
          title="Continue with Apple"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        </Button>
      </div>
    </CardContent>

    <CardFooter class="pt-6 border-t">
      <div class="text-center text-sm text-muted-foreground w-full">
        Already have an account?
        <Button variant="link" size="sm" class="p-0 h-auto ml-1" @click="goToLogin">
          Sign in
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useRegister } from '@/pages/RegisterPage/composables/userRegistration'

// Use composable to handle all state and functions
const {
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
} = useRegister()
</script>

<style scoped>

</style>