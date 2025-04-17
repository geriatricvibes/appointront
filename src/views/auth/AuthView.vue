<script setup lang="ts">
import LoginButton from '@/components/auth/LoginButton.vue'
import Smoke from '@/components/auth/Smoke.vue'
import WelcomeMessage from '@/components/auth/WelcomeMessage.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageLoaded = ref(false)

// If user is already logged in, redirect to dashboard
onMounted(() => {
  // Check for authentication - replace with your auth check logic
  const isAuthenticated = localStorage.getItem('auth_token')
  if (isAuthenticated) {
    router.push('/dashboard')
  }
  
  // Add a short delay before revealing the page
  setTimeout(() => {
    pageLoaded.value = true
  }, 100)
})
</script>

<template>
  <div 
    class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
    :class="pageLoaded ? 'opacity-100' : 'opacity-0'"
    style="transition: opacity 0.6s ease-in-out"
  >
    <!-- Smoke background effect -->
    <Smoke />
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
    
    <main class="relative flex flex-col md:flex-row min-h-screen">
      <!-- Left side: Welcome message -->
      <div 
        class="w-full md:w-1/2 flex-shrink-0 transition-all duration-700 ease-out transform md:translate-x-0 h-[30vh] md:h-auto"
        :class="pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <WelcomeMessage />
      </div>
      
      <!-- Right side: Login form with flexbox centering -->
      <div 
        class="w-full md:w-1/2 flex items-center justify-center flex-1 transition-all duration-700 ease-out delay-100 transform"
        :class="pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="w-full max-w-md bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 mx-4 sm:mx-6 md:mx-0 mt-6 md:mt-0">
          <div class="flex flex-col items-center mb-6 sm:mb-8">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              JustBookMe
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">Business scheduling made simple</p>
          </div>
          
          <LoginButton />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}

@media (max-width: 768px) {
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main > div:last-child {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;  /* Give some bottom spacing */
  }
}
</style>