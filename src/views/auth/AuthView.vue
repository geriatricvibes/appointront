<script setup lang="ts">
import LoginButton from '@/components/auth/LoginButton.vue'
import Smoke from '@/components/auth/Smoke.vue'
import WelcomeMessage from '@/components/auth/WelcomeMessage.vue'
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- Smoke background effect -->
    <Smoke />
    
    <main class="relative min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Left side: Welcome message -->
      <WelcomeMessage />
      
      <!-- Right side: Login form -->
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm space-y-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Welcome Back</h1>
            <p class="text-muted-foreground dark:text-gray-400">Sign in to access your dashboard</p>
          </div>
          <LoginButton />
        </div>
      </div>
    </main>
  </div>
</template>