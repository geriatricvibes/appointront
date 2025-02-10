<template>
  <div class="relative py-8 md:py-12">
    <!-- TracingBeam Implementation -->
    <TracingBeam class="px-6">
      <div class="relative mx-auto max-w-7xl antialiased">
        <!-- Header Section -->
        <div 
          class="text-center max-w-3xl mx-auto mb-12 md:mb-32 relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-3">
            How JustBookMe Works
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-muted-foreground">
            Transform your business's appointment scheduling into an automated, intelligent system in three simple steps
          </p>
        </div>

        <!-- Steps Content -->
        <div class="space-y-16 md:space-y-48 px-4 md:px-8">
          <!-- Step 1 -->
          <div class="relative">
            <div class="grid md:grid-cols-1 gap-4 md:gap-8 items-center">
              <div class="prose prose-sm dark:prose-invert">
                <Badge class="mb-2 md:mb-4 w-fit rounded-full bg-secondary text-secondary-foreground px-3 md:px-4 py-1 text-xs md:text-sm">
                  Step 1: Integration
                </Badge>
                <h3 class="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-4">Quick Integration</h3>
                <p class="text-sm md:text-base text-muted-foreground">
                  Seamlessly integrate JustBookMe with your website and phone systems. Our chatbot adapts to your business hours and scheduling preferences.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <Badge class="mb-4 w-fit rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm">
              Step 2: Automation
            </Badge>
            
            <div class="grid md:grid-cols-1 gap-8 items-center">
              <div class="prose prose-sm dark:prose-invert">
                <h3 class="text-xl md:text-2xl font-bold text-foreground mb-4">Smart Scheduling</h3>
                <p class="text-muted-foreground">
                  JustBookMe handles appointment requests 24/7, manages your calendar, and intelligently responds to customer queries about your services.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative">
            <div class="grid md:grid-cols-1 gap-8 items-center">
              <div class="prose prose-sm dark:prose-invert">
                <Badge class="mb-4 w-fit rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm">
                  Step 3: Engagement
                </Badge>
                <h3 class="text-xl md:text-2xl font-bold text-foreground mb-4">Smart Reminders</h3>
                <p class="text-muted-foreground">
                  Reduce no-shows with automated reminders, follow-ups, and real-time updates sent to your clients through their preferred communication channel.
                </p>
              </div>
            </div>
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
/* Update styles to ensure proper contrast with particle background */
.feature-card {
  @apply relative rounded-2xl border-border backdrop-blur-sm 
         transition-all duration-500 ease-out hover:scale-[1.02];
  background: hsl(var(--card) / 0.8); /* Add some transparency */
}

.feature-card:hover {

  @apply border-primary;
  box-shadow: 
    0 0 0 1px hsl(var(--primary) / 0.1),
    0 8px 30px hsl(var(--background) / 0.5);
}

.feature-icon-wrapper {
  @apply h-14 w-14 rounded-xl bg-muted 
         flex items-center justify-center text-muted-foreground border-border
         transition-all duration-500 ease-out;
}

.feature-card:hover .feature-icon-wrapper {
  
  @apply scale-110 border-primary bg-accent;
}

/* Keep animation keyframes but remove custom gradients */
.bg-grid-white {
  background-size: 100px 100px;
  background-image: 
    linear-gradient(to right, hsl(var(--primary) / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--primary) / 0.05) 1px, transparent 1px);
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientMove 8s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Updated mobile optimizations */
@media (max-width: 767px) {
  .feature-card {
    @apply p-4;
    min-height: auto;
    margin-bottom: 0.5rem;
  }

  .feature-icon-wrapper {
    @apply h-10 w-10 mx-auto;
  }

  .prose {
    @apply max-w-full;
  }

  .prose p {
    @apply text-sm leading-relaxed;
  }

  img {
    @apply w-full h-auto max-h-[200px] object-contain;
  }

  .relative.py-16 {
    @apply py-8 px-4;
  }

  .TracingBeam {
    @apply px-4 py-8;
  }

  /* Remove arrows on mobile */
  .arrow-step-2-to-3,
  .curved-arrow {
    display: none;
  }

  /* Adjust description text */
  .text-muted-foreground {
    @apply text-base;
    line-height: 1.5;
  }

  /* Add more space between steps */
  .space-y-16 > * + * {
    @apply mt-24;
  }

  /* Ensure proper spacing for Step 2 content */
  .prose + img {
    @apply mt-6;
  }
}

/* Remove duplicate media queries and combine them */
@media (min-width: 768px) {
  .feature-card {
    height: 100%;
    min-height: 250px;
  }
  
  .grid {
    row-gap: 4rem;
  }
}

/* Update hover effects to use theme colors */
.feature-card:hover svg {
  @apply text-primary;
}

.feature-card:hover h3 {
  @apply text-primary;
}

/* Smooth transitions for all hover effects */
.feature-card *,
.feature-icon-wrapper *,
svg,
h3 {
  @apply transition-all duration-500 ease-out;
}
</style>
