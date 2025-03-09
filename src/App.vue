<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

// Determine if the current route is a dashboard route
const route = useRoute()
const isDashboardRoute = computed(() => {
  return route.path.includes('/dashboard')
})
</script>

<template>
  <div class="app-container">
    <!-- Show Navbar for all routes except dashboard routes -->
    <Navbar v-if="!isDashboardRoute" />
    
    <!-- Main content -->
    <RouterView />
    
    <!-- Show Footer for all routes except dashboard routes -->
    <Footer v-if="!isDashboardRoute" />
  </div>
</template>

<style>
/* Global styles that should apply to the entire app */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Ensure navbar links maintain their original styling */
.navbar a {
  color: inherit;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: none;
}

/* Logo styles */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
