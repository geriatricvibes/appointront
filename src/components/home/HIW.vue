<template>
  <div class="relative py-6 md:py-8">
    <!-- TracingBeam Implementation -->
    <TracingBeam class="px-4">
      <div class="relative mx-auto max-w-4xl antialiased">
        <!-- Header Section -->
        <div 
          class="text-center max-w-3xl mx-auto mb-8 relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-3">
            How JustBookMe Works
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-muted-foreground">
            Set up your AI scheduling chatbot in three simple steps
          </p>
        </div>

        <!-- Steps Content - Timeline Layout -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 hidden md:block"></div>
          
          <!-- Steps -->
          <div class="space-y-6 md:space-y-12">
            <!-- Step 1 -->
            <div class="step-card">
              <div class="flex flex-col md:flex-row items-center">
                <div class="step-number">1</div>
                <div class="step-content md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                  <h3 class="step-title">Connect to Calendly</h3>
                  <p class="step-description">
                    Sign up for a free Calendly account in a single step and connect your scheduling preferences.
                  </p>
                </div>
                <div class="step-image-container order-1 md:order-2">
                  <img src="@/assets/connect.gif" alt="Connect to Calendly" class="step-image" />
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step-card">
              <div class="flex flex-col md:flex-row items-center">
                <div class="step-number">2</div>
                <div class="step-image-container order-1 md:order-1">
                  <img src="@/assets/upload.gif" alt="Upload Business Knowledge" class="step-image" />
                </div>
                <div class="step-content md:w-1/2 md:pl-8 order-2 md:order-2">
                  <h3 class="step-title">Upload Business Knowledge</h3>
                  <p class="step-description">
                    Add business-specific information to supplement the AI chat assistant with your website content or notes.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="step-card">
              <div class="flex flex-col md:flex-row items-center">
                <div class="step-number">3</div>
                <div class="step-content md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                  <h3 class="step-title">Copy & Paste Code</h3>
                  <p class="step-description">
                    Copy the code snippet with your API key into your website widget and you're done! Your AI scheduling chatbot is ready.
                  </p>
                </div>
                <div class="step-image-container order-1 md:order-2">
                  <img src="@/assets/code.gif" alt="Copy Code Snippet" class="step-image" />
                </div>
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
</script>

<style scoped>
/* Timeline and step styles */
.step-card {
  @apply relative bg-card rounded-lg p-4 border border-border transition-all duration-300;
}

.step-card:hover {
  @apply transform -translate-y-1 shadow-lg border-primary/50;
}

.step-number {
  @apply flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground 
         font-bold text-sm z-10 absolute top-4 left-4 md:left-1/2 md:transform md:-translate-x-1/2;
}

.step-content {
  @apply py-2 px-4 mt-6 md:mt-0;
}

.step-title {
  @apply text-lg font-bold text-foreground mb-2;
}

.step-description {
  @apply text-sm text-muted-foreground;
}

.step-image-container {
  @apply md:w-1/2 rounded-lg overflow-hidden shadow-md bg-muted/50 flex items-center justify-center;
  height: 180px;
}

.step-image {
  @apply w-full h-full object-contain max-h-[180px];
}

/* Alternating layout for desktop */
@media (min-width: 768px) {
  .step-card:nth-child(odd) .step-image-container {
    @apply ml-auto;
  }
  
  .step-card:nth-child(even) .step-image-container {
    @apply mr-auto;
  }
}

/* Mobile optimizations */
@media (max-width: 767px) {
  .step-image-container {
    @apply w-full mt-4 mb-2;
    height: 150px;
  }
  
  .step-content {
    @apply w-full text-center;
  }
}
</style>
