<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import NavigationBar from '@/components/layout/NavigationBar.vue'

const router = useRouter()
const { user } = useAuth()

onMounted(() => {
  if (!user.value) {
    router.push('/auth')
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavigationBar />
    
    <main class="flex-1 p-8 max-w-7xl mx-auto w-full">
      <div v-if="user" class="rounded-lg bg-card p-6 shadow">
        <h2 class="mb-2 font-semibold">Welcome, {{ user.email }}</h2>
        <p class="text-muted-foreground">You're successfully logged in!</p>
      </div>
    </main>
  </div>
</template> 