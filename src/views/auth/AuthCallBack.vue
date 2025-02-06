<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { initUser } = useAuth()

onMounted(() => {
  initUser()
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Processing authentication...</p>
  </div>
</template>