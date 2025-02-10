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
    
    if (accessToken) {
      // If we have an access token in the URL, exchange it for a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session) throw new Error('No session found')

      console.log('Debug: Session after Google login:', session) // Debug log
      await handleSession(session)
    } else {
      // No access token in URL, try to get existing session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session) throw new Error('No session found')

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
  console.log('Debug: Handling session:', session) // Debug log

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

  if (upsertError) {
    console.error('Debug: Error upserting user:', upsertError) // Debug log
    throw upsertError
  }

  // Then save tokens - including provider_refresh_token
  const tokenData = {
    user_id: session.user.id,
    provider_token: session.provider_token || null,
    refresh_token: session.provider_refresh_token|| null,
    expires_at: session.expires_in ? new Date(Date.now() + (session.expires_in * 1000)).toISOString() : null,
    updated_at: new Date().toISOString()
  }

  console.log('Debug: Saving token data:', tokenData) // Debug log

  const { error: tokenError } = await supabase
    .from('user_tokens')
    .upsert(tokenData, {
      onConflict: 'user_id'
    })

  if (tokenError) {
    console.error('Debug: Error saving tokens:', tokenError) // Debug log
    throw tokenError
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="error" class="text-destructive">{{ error }}</div>
    <p v-else class="text-muted-foreground">Processing authentication...</p>
  </div>
</template>