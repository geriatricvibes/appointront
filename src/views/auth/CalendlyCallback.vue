<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardApi } from '@/api/dashboard'

const router = useRouter()
const error = ref<string | null>(null)

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (!code) {
    error.value = 'No authorization code found'
    return
  }

  try {
    await dashboardApi.exchangeCalendlyCode({
      code,
      redirect_uri: `${window.location.origin}/auth/calendly/callback`
    })
    
    // Redirect back to dashboard on success
    router.push({
      name: 'dashboard',
      query: { calendly_connected: 'true' }
    })
  } catch (err: any) {
    error.value = err.response?.data?.detail || 'Failed to connect with Calendly'
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="error" class="text-destructive p-4 rounded-md bg-destructive/10">
      {{ error }}
    </div>
    <div v-else class="text-center">
      <p class="text-muted-foreground">Connecting your Calendly account...</p>
    </div>
  </div>
</template> 