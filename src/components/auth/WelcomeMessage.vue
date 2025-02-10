<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Typed from 'typed.js'

let typedInstance = null

onMounted(() => {
  typedInstance = new Typed('.typed-text', {
    strings: [
      'Schedule appointments effortlessly.',
      'Get instant answers to your queries.',
      'Never miss a meeting with smart reminders.',
      'Connect with businesses 24/7.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    cursorChar: '▋'
  })
})

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy()
  }
})
</script>

<template>
  <div class="flex min-h-[15vh] md:min-h-screen bg-white dark:bg-gray-900 relative flex-col justify-center p-4 md:p-12 shadow-sm">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"/>
    <div class="absolute inset-0 bg-grid-pattern opacity-3"/>
    <div class="text-center max-w-2xl mx-auto relative z-10 mt-8 md:mt-0">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-8 text-gray-900 dark:text-white tracking-tight leading-tight">
        <span class="typed-text"></span>
      </h2>
      <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg font-light mt-3 md:mt-6 px-4 md:px-0">
        Join thousands of businesses who trust our AI assistant to manage their appointments and customer support
      </p>
    </div>
  </div>
</template>