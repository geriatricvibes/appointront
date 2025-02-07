<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const { initUser } = useAuth()
const router = useRouter()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Get the auth code from URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    
    if (!accessToken) {
      // Try to exchange auth code for session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session) throw new Error('No session found')

      // Save session data
      await handleSession(session)
    }

    await initUser()
    router.push('/dashboard')
  } catch (err) {
    console.error('Error in auth callback:', err)
    error.value = 'Authentication failed. Please try again.'
    setTimeout(() => router.push('/auth'), 3000)
  }
})

async function handleSession(session: any) {
  // First, ensure user exists in users table
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({
      id: session.user.id,
      email: session.user.email,
      is_active: true,
      is_superuser: false
    }, {
      onConflict: 'id'
    })

  if (upsertError) throw upsertError

  // Then save tokens
  const { error: tokenError } = await supabase
    .from('user_tokens')
    .upsert({
      user_id: session.user.id,
      provider_token: session.provider_token,
      refresh_token: session.refresh_token,
      expires_at: new Date(Date.now() + (session.expires_in * 1000)).toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })

  if (tokenError) throw tokenError
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="error" class="text-destructive">{{ error }}</div>
    <p v-else class="text-muted-foreground">Processing authentication...</p>
  </div>
</template>