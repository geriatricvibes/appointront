<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AnimatedBlob from '../common/AnimatedBlob.vue'
import RippleAnimation from '../common/RippleAnimation.vue'
import { ref } from 'vue'
import { Brain } from 'lucide-vue-next'
const activeTab = ref('about')
</script>

<template>
  <section class="relative py-8 md:py-12 flex items-center">
    <div class="relative container mx-auto px-4">
      <!-- Header Section -->
      <div class="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Your Smart Business Assistant
        </h2>
        <p class="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
          Automate appointments, answer queries, and boost client engagement with AI
        </p>
      </div>

      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full max-w-5xl mx-auto mb-8">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="about">Features</TabsTrigger>
          <TabsTrigger value="demos">Demos</TabsTrigger>
        </TabsList>

        <!-- About Tab Content -->
        <TabsContent value="about">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <!-- Appointment Scheduling Card -->
            <Card class="group relative">
              <div class="aspect-[2/1] overflow-hidden relative rounded-t-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
                <RippleAnimation />
              </div>
              
              <CardHeader>
                <div class="flex items-center gap-3 mb-2">
                  <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <CardTitle>Appointment Scheduling</CardTitle>
                </div>
                <CardDescription>
                  Automated booking system that works 24/7
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div class="grid grid-cols-1 gap-2">
                  <Badge variant="secondary" class="justify-start">Smart Calendar Integration</Badge>
                  <Badge variant="secondary" class="justify-start">Instant Slot Availability</Badge>
                  <Badge variant="secondary" class="justify-start">Custom Booking Rules</Badge>
                  <Badge variant="secondary" class="justify-start">Multi-timezone Support</Badge>
                </div>
              </CardContent>
            </Card>

            <!-- Query Resolution Card -->
            <Card class="group relative">
              <div class="aspect-[2/1] overflow-hidden relative rounded-t-lg bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900">
                <AnimatedBlob />
              </div>
              
              <CardHeader>
                <div class="flex items-center gap-3 mb-2">
                  <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <CardTitle>Query Resolution</CardTitle>
                </div>
                <CardDescription>
                  Instant responses to customer inquiries
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div class="grid grid-cols-1 gap-2">
                  <Badge variant="secondary" class="justify-start">Website Chat Integration</Badge>
                  <Badge variant="secondary" class="justify-start">Phone Support</Badge>
                  <Badge variant="secondary" class="justify-start">FAQ Automation</Badge>
                  <Badge variant="secondary" class="justify-start">24/7 Availability</Badge>
                </div>
              </CardContent>
            </Card>

            <!-- Reminder System Card -->
            <Card class="group relative">
              <div class="aspect-[2/1] overflow-hidden relative rounded-t-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900">
                <RippleAnimation />
              </div>
              
              <CardHeader>
                <div class="flex items-center gap-3 mb-2">
                  <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <CardTitle>Smart Reminders</CardTitle>
                </div>
                <CardDescription>
                  Automated follow-ups and reminders
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div class="grid grid-cols-1 gap-2">
                  <Badge variant="secondary" class="justify-start">SMS Notifications</Badge>
                  <Badge variant="secondary" class="justify-start">Email Reminders</Badge>
                  <Badge variant="secondary" class="justify-start">Custom Scheduling</Badge>
                  <Badge variant="secondary" class="justify-start">Confirmation Tracking</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- Demos Tab Content -->
        <TabsContent value="demos">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            <!-- Demo Card -->
            <Card class="group relative">
              <div class="aspect-[2/1] overflow-hidden relative rounded-t-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
                <RippleAnimation />
              </div>
              
              <CardHeader>
                <div class="flex items-center gap-3 mb-2">
                  <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                    <Brain class="h-5 w-5" />
                  </div>
                  <CardTitle>GeriatricWisdom</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <div class="grid grid-cols-2 gap-2">
                  <Badge variant="secondary">Knowledge Base</Badge>
                  <Badge variant="secondary">Smart Citations</Badge>
                  <Badge variant="secondary">Discord Bot</Badge>
                  <Badge variant="secondary">Wiki Tools</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>

<style scoped>
/* Base card styles */
.group {
  @apply w-full;
}



/* Tab transition styles */
[role="tabpanel"] {
  transition: all 0.3s ease-in-out;
}

[role="tabpanel"][data-state="inactive"] {
  opacity: 0;
  transform: translateY(10px);
  position: absolute;
  pointer-events: none;
  
}

[role="tabpanel"][data-state="active"] {
  opacity: 1;
  transform: translateY(0);
  position: relative;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .group {
    @apply max-w-full mx-auto;
  }
  

  /* Ensure hover content is fully visible on mobile */
  .group-hover\:opacity-100 {
    @apply overflow-y-auto max-h-[80vh];
  }

  /* Adjust animation timing for better mobile experience */
  .group:hover li {
    animation-duration: 0.4s;
  }
}

/* Existing animations and other styles... */
.group:hover .group-hover\:opacity-100 {
  pointer-events: auto;
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


.group:hover li {
  animation: fadeSlideUp 0.5s ease forwards;
  opacity: 0;
}

.group:hover li:nth-child(1) { animation-delay: 0.1s; }
.group:hover li:nth-child(2) { animation-delay: 0.2s; }
.group:hover li:nth-child(3) { animation-delay: 0.3s; }
.group:hover li:nth-child(4) { animation-delay: 0.4s; }

/* Add these new styles */
.max-h-0 {
  
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

video {
  @apply transition-transform duration-300;
}

video:hover {
  transform: scale(1.01);
}
</style>
  
  