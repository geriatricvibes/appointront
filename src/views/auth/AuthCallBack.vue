<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const { initUser } = useAuth()
const router = useRouter()

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    // First, ensure user exists in users table
    await supabase
      .from('users')
      .upsert({
        id: session.user.id,
        email: session.user.email,
        is_active: true,
        is_superuser: false
      }, {
        onConflict: 'id'
      })

    // Then save tokens
    await supabase
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
  }

  await initUser()
  router.push('/dashboard')
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-muted-foreground">Processing authentication...</p>
  </div>
</template>