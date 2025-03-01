<template>
  <div class="relative py-6 md:py-8">
    <!-- TracingBeam Implementation -->
    <TracingBeam class="px-4">
      <div class="relative mx-auto max-w-5xl antialiased">
        <!-- Header Section -->
        <div 
          class="text-center max-w-3xl mx-auto mb-8 md:mb-12 relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-3">
            How JustBookMe Works
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-muted-foreground">
            Transform your business's appointment scheduling in three simple steps
          </p>
        </div>

        <!-- Steps Content - More Compact Version -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <!-- Step 1 -->
          <div class="relative bg-card rounded-lg p-6 border border-border">
            <Badge class="mb-3 w-fit rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs">
              Step 1
            </Badge>
            <h3 class="text-lg font-bold text-foreground mb-2">Quick Integration</h3>
            <p class="text-sm text-muted-foreground">
              Seamlessly integrate with your website and phone systems. Our chatbot adapts to your business hours and scheduling preferences.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative bg-card rounded-lg p-6 border border-border">
            <Badge class="mb-3 w-fit rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs">
              Step 2
            </Badge>
            <h3 class="text-lg font-bold text-foreground mb-2">Smart Scheduling</h3>
            <p class="text-sm text-muted-foreground">
              Handles appointment requests 24/7, manages your calendar, and intelligently responds to customer queries about your services.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative bg-card rounded-lg p-6 border border-border">
            <Badge class="mb-3 w-fit rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs">
              Step 3
            </Badge>
            <h3 class="text-lg font-bold text-foreground mb-2">Smart Reminders</h3>
            <p class="text-sm text-muted-foreground">
              Reduce no-shows with automated reminders, follow-ups, and real-time updates sent to your clients through their preferred channel.
            </p>
          </div>
        </div>
      </div>
    </TracingBeam>
  </div>
</template>

<script setup lang="ts">
import TracingBeam from '@/components/common/TracingBeam.vue'
import { Badge } from '@/components/ui/badge'
</script>

<style scoped>
/* Base card styles */
.bg-card {
  transition: all 0.3s ease;
}

.bg-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: hsl(var(--primary) / 0.5);
}

/* Mobile optimizations */
@media (max-width: 767px) {
  .grid {
    gap: 1rem;
  }
  
  .relative.bg-card {
    padding: 1rem;
  }
}
</style>
