<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from '../composables/useMeta'
import { supabase } from '../lib/supabase'
import Hero from '../components/home/Hero.vue'
import ParticleBackground from '../components/home/ParticleBackground.vue'
import Navbar from '../components/layout/Navbar.vue'
import Reviews from '../components/home/Reviews.vue'
import About from '../components/home/About.vue'
import Footer from '../components/layout/Footer.vue'
import FAQ from '../components/home/FAQ.vue'
import HIW from '../components/home/HIW.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

// We'll import other sections as we build them

const router = useRouter()
const { updateMeta } = useMeta()

const handleGetStarted = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    // User is logged in, redirect to library
    router.push('/library')
  } else {
    // User is not logged in, redirect to login
    router.push('/auth/login')
  }
}

onMounted(() => {
  document.body.classList.add('home-page')
  // Enable smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Update meta tags
  updateMeta({
    title: 'geriatricwriters - Smart Writing Tools Tailored for the Golden Years',
    description: 'Revolutionize your writing! Build interactive knowledge bases, refine your content, and captivate your readers like never before.',
    meta: [
      { property: 'og:title', content: 'geriatricwriters - Smart Writing Tools Tailored for the Golden Years' },
      { property: 'og:description', content: 'Revolutionize your writing! Build interactive knowledge bases, refine your content, and captivate your readers like never before.' },
      { property: 'og:image', content: 'https://www.geriatricwriters.com/og-image.jpg' },
      { property: 'og:url', content: 'https://www.geriatricwriters.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'geriatricwriters - Smart Writing Tools Tailored for the Golden Years' },
      { name: 'twitter:description', content: 'Revolutionize your writing! Build interactive knowledge bases, refine your content, and captivate your readers like never before.' },
      { name: 'twitter:image', content: 'https://www.geriatricwriters.com/twitter-card.jpg' }
    ]
  })

  // Add structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'geriatricwriters',
    'description': 'Smart writing tools for authors, readers, and publishers',
    'applicationCategory': 'Writing Software',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Smart Wiki Creation',
      'Character Analysis',
      'Plot Timeline Generation',
      'Inconsistency Checking',
      'Multi-language Support'
    ]
  }

  const scriptTag = document.createElement('script')
  scriptTag.setAttribute('type', 'application/ld+json')
  scriptTag.textContent = JSON.stringify(structuredData)
  document.head.appendChild(scriptTag)
})

onUnmounted(() => {
  document.body.classList.remove('home-page')
  // Reset scroll behavior
  document.documentElement.style.scrollBehavior = ''
  // Remove structured data script
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  scripts.forEach(script => script.remove())
})
</script>

<template>
  <ScrollArea class="min-h-[100dvh] relative bg-background scrollarea-themed">
    <AuroraBackground class="absolute inset-0 z-0" />
    
    <header class="h-[100dvh] relative overflow-hidden flex items-center justify-center">
      <ParticleBackground class="absolute inset-0" />
      <div class="relative z-20 h-full w-full flex flex-col">
        <Navbar />
        <Hero class="flex-1 flex items-center justify-center" @get-started="handleGetStarted" />
      </div>
    </header>
    
    <div class="relative z-10 space-y-8 md:space-y-12">
      <section id="about-section" aria-label="About Us" class="scroll-mt-16">
        <About />
      </section>
      <section aria-label="How It Works" class="relative scroll-mt-16">
        <HIW />
      </section>
      <section aria-label="Customer Reviews" class="scroll-mt-16">
        <Reviews />
      </section>
      <section aria-label="Wiki Features" class="scroll-mt-16">
        <Wiki />
      </section>
      <section aria-label="Translation Services" class="scroll-mt-16">
        <Translation />
      </section>
      <section aria-label="Frequently Asked Questions" class="scroll-mt-16">
        <FAQ />
      </section>
      <Footer />
    </div>
  </ScrollArea>
</template>

<style scoped>
/* Remove existing media query since we're using space-y utilities */
</style>