<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth'
import { ref, onMounted } from 'vue'

const { signInWithGoogle, loading } = useAuth()
const buttonReady = ref(false)

onMounted(() => {
  // Animate button appearance after a short delay
  setTimeout(() => {
    buttonReady.value = true
  }, 300)
})

const handleSignIn = async () => {
  try {
    await signInWithGoogle()
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}
</script>

<template>
  <div>
    <Button 
      @click="handleSignIn" 
      :disabled="loading"
      :class="[
        'w-full relative overflow-hidden group transition-all duration-300 ease-in-out',
        'bg-white hover:bg-gray-50 dark:bg-white dark:hover:bg-gray-50',
        'text-gray-800 dark:text-gray-800 border border-gray-200',
        'shadow-sm hover:shadow-md',
        'transform hover:-translate-y-0.5 active:translate-y-0',
        buttonReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      ]"
    >      
      <div class="flex items-center justify-center gap-3 py-2.5 relative z-10">
        <!-- Google Icon with subtle animation -->
        <div class="flex-shrink-0 relative">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
            <!-- Google logo -->
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </div>
        
        <!-- Text with loading state -->
        <span class="text-base sm:text-lg font-medium relative">
          <span 
            class="inline-block transition-all duration-300"
            :class="loading ? 'opacity-0 -translate-y-2' : 'opacity-100'"
          >
            Sign in with Google
          </span>
          <span 
            class="absolute inset-0 flex items-center justify-center transition-all duration-300"
            :class="loading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
          >
            <span class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          </span>
        </span>
      </div>
    </Button>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}
</style>