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
          We would love to hear from you! Please use the form below to get in touch with us.
        </p>
      </div>
    </div>

    <main class="relative z-10">
      <!-- Contact Methods Section -->
      <div class="relative bg-background">
        <div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
            <!-- Discord Card -->
            <Card class="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardContent class="p-6">
                <div class="flex flex-col items-center space-y-4">
                  <div class="p-4 bg-[#5865F2] rounded-full transition-transform group-hover:scale-110">
                    <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold">Join Our Discord</h3>
                  <div class="space-y-2 text-center">
                    <p class="text-muted-foreground">Connect with our vibrant community</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li> 24/7 Active Community</li>
                      <li> Exclusive Updates & News</li>
                      <li> Live Events & Discussions</li>
                    </ul>
                  </div>
                  <div class="pt-2 w-full">
                    <Button variant="discord" asChild class="w-full group-hover:shadow-md transition-all">
                      <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
                        Join Server
                        <ExternalLinkIcon class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Email Card -->
            <Card class="group relative overflow-hidden transition-all hover:shadow-lg">
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
                      <a href="mailto:support@geriatricwriters.com" class="flex items-center justify-center">
                        Email Us
                        <ExternalLinkIcon class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Twitter Card -->
            <Card class="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardContent class="p-6">
                <div class="flex flex-col items-center space-y-4">
                  <div class="p-4 bg-[#1DA1F2] rounded-full transition-transform group-hover:scale-110">
                    <TwitterIcon class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold">Twitter Updates</h3>
                  <div class="space-y-2 text-center">
                    <p class="text-muted-foreground">Stay Updated in Real-Time</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li> Latest News & Updates</li>
                      <li> Community Interactions</li>
                      <li> Quick Support Response</li>
                    </ul>
                  </div>
                  <div class="pt-2 w-full">
                    <Button variant="outline" asChild class="w-full group-hover:shadow-md transition-all hover:bg-[#1DA1F2] hover:text-white">
                      <a href="https://x.com/geriatricwriter" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
                        Follow Us
                        <ExternalLinkIcon class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Instagram Card -->
            <Card class="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardContent class="p-6">
                <div class="flex flex-col items-center space-y-4">
                  <div class="p-4 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full transition-transform group-hover:scale-110">
                    <InstagramIcon class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold">Instagram Feed</h3>
                  <div class="space-y-2 text-center">
                    <p class="text-muted-foreground">Visual Updates & Stories</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li> Behind the Scenes</li>
                      <li> Community Highlights</li>
                      <li> Visual Announcements</li>
                    </ul>
                  </div>
                  <div class="pt-2 w-full">
                    <Button variant="outline" asChild class="w-full group-hover:shadow-md transition-all hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white">
                      <a href="https://www.instagram.com/geriatric_writers/?hl=en" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
                        Follow Us
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
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HyperText from '@/components/ui/hyper/HyperText.vue'
import AuroraBackground from '@/components/home/AuroraBackground.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare as DiscordIcon,
  Mail as MailIcon, 
  ExternalLink as ExternalLinkIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from 'lucide-vue-next'

// Scroll to top on mount
onMounted(() => {
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
