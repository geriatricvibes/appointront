<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToAuth = () => {
  router.push('/auth')
}
</script>

<template>
  <main class="container flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-8">Welcome to Our App</h1>
    <Button @click="navigateToAuth" size="lg">
      Get Started
    </Button>
  </main>
</template> 