import { onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

export function useTokenRefresh() {
  let refreshInterval: NodeJS.Timeout

  const refreshToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      // Refresh 5 minutes before expiry
      const expiresIn = session.expires_in
      const refreshTime = (expiresIn - 300) * 1000 // 5 minutes before expiry

      refreshInterval = setInterval(async () => {
        const { data: { session: refreshedSession }, error } = await supabase.auth.refreshSession()
        
        if (error) {
          console.error('Failed to refresh session:', error)
          return
        }
        
        if (refreshedSession) {
          await supabase
            .from('auth.user_tokens')
            .upsert({
              user_id: refreshedSession.user.id,
              provider_token: refreshedSession.provider_token,
              refresh_token: refreshedSession.refresh_token,
              expires_at: new Date(Date.now() + (refreshedSession.expires_in * 1000)).toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id'
            })
        }
      }, refreshTime)
    }
  }

  onMounted(() => {
    refreshToken()
  })

  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
  })

  return {
    refreshToken
  }
} 