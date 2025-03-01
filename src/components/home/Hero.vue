<script setup>
import { SparklesIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import FlipWords from '@/components/common/FlipWords.vue'
import ParticleBackground from '@/components/home/ParticleBackground.vue'

const router = useRouter()

const flipWords = ['Businesses', 'Appointments', 'Customer Service', 'Client Follow-ups', 'Sales Teams']

const scrollToFeatures = () => {
  const aboutSection = document.getElementById('about-section')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateToAuth = () => {
  router.push('/auth')
}
</script>

<template>
  <section class="w-full relative">
    <div class="absolute inset-0 z-10">
      <ParticleBackground class="!absolute !inset-0 !z-10" />
    </div>
    <div class="container mx-auto px-4 relative z-20">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight">
          AI Assistant for<FlipWords
            :words="flipWords"
            :duration="3000"
            class="text-primary"
          />
        </h1>
        
        <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Your 24/7 virtual assistant that books appointments, answers questions, and follows up with clients automatically
        </p>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
          <Button 
            @click="navigateToAuth"
            size="lg"
            class="group"
          >
            <span>Get Started Free</span>
            <SparklesIcon 
              class="h-5 w-5 ml-2 transition-transform group-hover:rotate-12" 
            />
          </Button>
          
          <Button 
            @click="scrollToFeatures"
            variant="outline"
            size="lg"
            class="group"
          >
            See How It Works
            <ChevronRightIcon 
              class="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
            />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-balance {
  text-wrap: balance;
}

:deep(.particles-js-canvas-el) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 10 !important;
}
</style>


