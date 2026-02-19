<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const router = useRouter()
const email = ref('')
const password = ref('')
const role = ref('BUSINESSMAN')

const handleLogin = () => {
  // Mock login - no backend validation
  if (role.value === 'BUSINESSMAN') {
    router.push('/businessman')
  } else if (role.value === 'LGU') {
    router.push('/lgu')
  }
}
</script>

<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      
      <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      
      <div class="space-y-2">
        <Label for="role">Select Role</Label>
        <Select v-model="role">
          <SelectTrigger id="role">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BUSINESSMAN">BUSINESSMAN</SelectItem>
            <SelectItem value="LGU">LGU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button @click="handleLogin" class="w-full">
        Login
      </Button>
    </CardContent>
  </Card>
</template>
