<template>
  <footer class="relative">
    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <img src="/calendar-sync.png" alt="JustBookMe Logo" class="h-5 w-5 dark:invert" />
              <h3 class="text-2xl font-semibold text-foreground">JustBookMe</h3>
              <div class="flex items-center gap-1 ml-1">
                <p class="text-xs text-muted-foreground">by</p>
                <img src="/darkhard.png" alt="Hard Marketing Logo" class="hidden h-6 w-auto dark:block" />
                <img src="/lighthard.png" alt="Hard Marketing Logo" class="h-6 w-auto block dark:hidden" />
              </div>
            </div>
            <!-- Parent Brand -->
          </div>
          <p class="text-sm text-muted-foreground">
            Streamlining appointments and customer engagement through intelligent automation.
          </p>
          <p class="text-sm text-muted-foreground">
            <a href="mailto:contact@justbookme.ai" class="hover:text-primary transition-colors">contact@justbookme.ai</a>
          </p>
          <p class="text-sm text-muted-foreground">
            <a href="https://www.justbookme.ai" class="hover:text-primary transition-colors">www.justbookme.ai</a>
          </p>
          <div class="flex space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              class="hover:text-foreground text-muted-foreground"
              as="a"
              href="https://x.com/geriatricwriter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon class="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              class="hover:text-foreground text-muted-foreground"
              as="a"
              href="https://www.facebook.com/share/18yu9kT7qt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon class="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              class="hover:text-foreground text-muted-foreground"
              as="a"
              href="https://www.instagram.com/hard_marketing03?igsh=MTU5Z3lxbnloZWFseg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-foreground">Quick Links</h3>
          <nav class="flex flex-col space-y-2">
            <router-link 
              v-for="link in quickLinks" 
              :key="link.to" 
              :to="link.to"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ link.text }}
            </router-link>
          </nav>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-border/50">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p class="text-sm text-muted-foreground">
            &copy; {{ new Date().getFullYear() }} JustBookMe. All rights reserved.
          </p>
          <nav class="flex space-x-4">
            <router-link 
              v-for="link in legalLinks" 
              :key="link.to" 
              :to="link.to"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ link.text }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { TwitterIcon, FacebookIcon, InstagramIcon } from 'lucide-vue-next'

const quickLinks = [
  { to: '/about', text: 'About Us' },
  { to: '/pricing', text: 'Pricing' },
  { to: '/contact', text: 'Contact' }
]

const legalLinks = [
  { to: '/privacy-policy', text: 'Privacy Policy' },
  { to: '/terms-of-use', text: 'Terms of Use' },
  { to: '/refund', text: 'Refund Policy' }
]
</script>

<style scoped>
/* Optional: Add hover effects for links */
.router-link-active {
  @apply text-foreground;
}

/* Optimize for mobile */
@media (max-width: 767px) {
  .grid {
    @apply gap-6;
  }
  
  .space-y-4 {
    @apply space-y-3;
  }
}
</style>
  