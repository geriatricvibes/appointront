<script setup lang="ts">
import { onMounted } from 'vue';
import Navbar from '../../components/layout/Navbar.vue';
import Footer from '../../components/layout/Footer.vue';
import AuroraBackground from '../../components/home/AuroraBackground.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHead } from 'unhead';



// Update SEO metadata
useHead({
  title: 'Pricing - JustBookMe',
  meta: [
    {
      name: 'description',
      content: 'Choose the perfect plan for your appointment scheduling chatbot. Let JustBookMe handle your appointments, answer customer queries, and boost attendance with smart reminders.',
    },
    {
      property: 'og:title',
      content: 'Pricing - JustBookMe',
    },
    {
      property: 'og:description',
      content: 'Choose the perfect plan for your appointment scheduling chatbot. Let JustBookMe handle your appointments, answer customer queries, and boost attendance with smart reminders.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://justbookme.com/pricing',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Pricing - JustBookMe',
    },
    {
      name: 'twitter:description',
      content: 'Choose the perfect plan for your appointment scheduling chatbot. Let JustBookMe handle your appointments, answer customer queries, and boost attendance with smart reminders.',
    },
  ],
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main class="overflow-x-hidden position-relative min-h-screen">
    <Navbar />
    <!-- Hero Section -->
    <div class="relative isolate bg-background overflow-hidden">
      <AuroraBackground class="absolute inset-0 -z-10 opacity-100" />
      <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8 text-center z-20">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8">
          Smart <span class="text-primary">Appointment Management</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-foreground px-4 max-w-2xl mx-auto">
          Transform your business with AI-powered appointment scheduling, automated reminders, and intelligent customer support.
        </p>
      </div>
    </div>

    <!-- Pricing Plans -->
    <div class="relative bg-background py-24 sm:py-32 z-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- Basic Plan -->
          <Card class="group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
              <div class="flex items-center gap-3 mb-2">
                <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v12m-8-6h16" />
                  </svg>
                </div>
                <CardTitle>Basic</CardTitle>
              </div>
              <div class="mt-4">
                <p class="text-4xl font-bold text-foreground">$10</p>
                <p class="text-sm text-muted-foreground mt-1">per month</p>
              </div>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-2 mb-6">
                <Badge variant="secondary">300 Appointments/month</Badge>
                <Badge variant="secondary">Basic Appointment Scheduling</Badge>
                <Badge variant="secondary">Standard Response Templates</Badge>
                <Badge variant="secondary">Email Reminders</Badge>
                <Badge variant="secondary">Website Integration</Badge>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex flex-col items-center gap-3 text-sm">
                  <span class="text-muted-foreground">Perfect for small clinics and consultants</span>
                </li>
              </ul>
              <button class="w-full px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm">
                Subscribe
              </button>
            </CardContent>
          </Card>

          <!-- Premium Plan -->
          <Card class="group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border-primary">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge class="bg-primary text-primary-foreground">Most Popular</Badge>
            </div>
            <CardHeader>
              <div class="flex items-center gap-3 mb-2">
                <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v12m-8-6h16" />
                  </svg>
                </div>
                <CardTitle>Premium</CardTitle>
              </div>
              <div class="mt-4">
                <p class="text-4xl font-bold text-foreground">$25</p>
                <p class="text-sm text-muted-foreground mt-1">per month</p>
              </div>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-2 mb-6">
                <Badge variant="secondary">Unlimited Appointments</Badge>
                <Badge variant="secondary">Advanced Scheduling System</Badge>
                <Badge variant="secondary">Custom AI Training</Badge>
                <Badge variant="secondary">SMS, Email & WhatsApp Reminders</Badge>
                <Badge variant="secondary">Website & Phone Integration</Badge>
                <Badge variant="secondary">Attendance Analytics</Badge>
                <Badge variant="secondary">24/7 Priority Support</Badge>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex flex-col items-center gap-3 text-sm">
                  <span class="text-muted-foreground">Ideal for medical practices and large businesses</span>
                </li>
              </ul>
              <button class="w-full px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm">
                Subscribe
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <div class="relative bg-background z-10">
      <Footer />
    </div>
  </main>
  
</template>

<style scoped>
.group {
  @apply w-full;
}

@media (max-width: 768px) {
  .group {
    @apply max-w-sm mx-auto;
  }
  
  :deep(.card) {
    @apply mb-8;
  }
}

/* Add hover animations similar to About.vue */
.group:hover li {
  animation: fadeSlideUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover li:nth-child(1) { animation-delay: 0.1s; }
.group:hover li:nth-child(2) { animation-delay: 0.2s; }
.group:hover li:nth-child(3) { animation-delay: 0.3s; }

/* Update footer styles */
:deep(.footer) {
  position: relative;
  z-index: 20;
  background-color: rgb(var(--background));
}

:deep(.aurora-background) {
  opacity: 1;
  pointer-events: none;
}
</style>
