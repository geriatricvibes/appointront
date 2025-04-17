<script setup lang="ts">
import { RouterView } from 'vue-router'

// Determine if the current route is a dashboard or auth route

</script>

<template>
  <div class="app-container">
    <!-- Show Navbar for all routes except dashboard and auth routes -->
    <!-- <Navbar v-if="!hideNavAndFooter" />
     -->
    <!-- Main content -->
    <RouterView />
    
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
