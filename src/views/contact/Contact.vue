<template>
  <div class="relative min-h-screen">
    <Navbar />
    
    <!-- Hero Section with AuroraBackground -->
    <div class="relative isolate bg-background overflow-hidden">
      <AuroraBackground class="absolute inset-0 -z-10 opacity-100" />
      <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8 z-20">
        <div class="text-center">
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8 inline-block">
            <HyperText
              text="Contact Us"
              :duration="3000"
            />
          </h2>
        </div>
        <p class="text-base sm:text-lg md:text-xl text-foreground px-4 max-w-2xl mx-auto text-center">
          We would love to hear from you! Please use the email below to get in touch with us.
        </p>
      </div>
    </div>

    <main class="relative z-10">
      <!-- Contact Methods Section -->
      <div class="relative bg-background">
        <div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-16">
          <div class="flex justify-center">
            <!-- Email Card -->
            <Card class="group relative overflow-hidden transition-all hover:shadow-lg max-w-md w-full">
              <CardContent class="p-6">
                <div class="flex flex-col items-center space-y-4">
                  <div class="p-4 bg-primary/20 rounded-full transition-transform group-hover:scale-110">
                    <MailIcon class="w-8 h-8 text-foreground" />
                  </div>
                  <h3 class="text-xl font-semibold">Email Support</h3>
                  <div class="space-y-2 text-center">
                    <p class="text-muted-foreground">Professional Support Team</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li> 24-48h Response Time</li>
                      <li> Dedicated Support Team</li>
                      <li> Detailed Assistance</li>
                    </ul>
                  </div>
                  <div class="pt-2 w-full">
                    <Button variant="outline" asChild class="w-full group-hover:shadow-md transition-all">
                      <a href="mailto:contact@justbookme.ai" class="flex items-center justify-center">
                        Email Us
                        <ExternalLinkIcon class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <div class="relative mt-auto">
      <div class="absolute inset-0 bg-background"></div>
      <Footer class="relative" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommonMeta } from '../../composables/useCommonMeta'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HyperText from '@/components/ui/hyper/HyperText.vue'
import AuroraBackground from '@/components/home/AuroraBackground.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail as MailIcon, 
  ExternalLink as ExternalLinkIcon
} from 'lucide-vue-next'

// Get the setPageMeta function from our composable
const { setPageMeta } = useCommonMeta();

// Scroll to top on mount and set meta tags
onMounted(() => {
  // Set the meta tags for the contact page
  setPageMeta(
    'Contact Us', 
    'Get in touch with the JustBookMe team. We\'re here to help with any questions about our intelligent appointment scheduling and customer engagement solutions.'
  );
  
  window.scrollTo(0, 0)
})
</script>
  
<style scoped>
:deep(.aurora-background) {
  opacity: 1;
  pointer-events: none;
}

:deep(.footer) {
  position: relative;
  z-index: 50;
  background-color: rgb(var(--background));
  isolation: isolate;
}

:deep(.footer::before) {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgb(var(--background));
  z-index: -1;
}
</style>
