<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { initUser } = useAuth()
const router = useRouter()

onMounted(async () => {
  await initUser()
  // Redirect to dashboard or home after successful auth
  router.push('/dashboard') // or wherever you want to redirect after login
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-muted-foreground">Processing authentication...</p>
  </div>
</template>