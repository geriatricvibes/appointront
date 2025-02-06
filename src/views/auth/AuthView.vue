<script setup lang="ts">
import LoginButton from '@/components/auth/LoginButton.vue'
</script>

<template>
  <main class="container flex min-h-screen flex-col items-center justify-center">
    <div class="w-full max-w-sm space-y-4">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold">Welcome Back</h1>
        <p class="text-muted-foreground">Sign in to access your dashboard</p>
      </div>
      <LoginButton />
    </div>
  </main>
</template>