<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { Button } from '@/components/ui/button'

const router = useRouter()
const { user, signOut } = useAuth()

onMounted(() => {
  if (!user.value) {
    router.push('/auth')
  }
})

const handleSignOut = async () => {
  await signOut()
  router.push('/auth')
}
</script>

<template>
  <main class="container py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <Button variant="outline" @click="handleSignOut">Sign Out</Button>
    </div>
    
    <div v-if="user" class="bg-card p-6 rounded-lg shadow">
      <h2 class="font-semibold mb-2">Welcome, {{ user.email }}</h2>
      <p class="text-muted-foreground">You're successfully logged in!</p>
    </div>
  </main>
</template> 