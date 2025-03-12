<script setup lang="ts">
import { onMounted } from 'vue';
import { useCommonMeta } from '../../composables/useCommonMeta';
import AuroraBackground from '../../components/home/AuroraBackground.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// const router = useRouter();

// // const navigateToAboutDemo = () => {
// //   router.push({ path: '/', hash: '#about-section' });
// // };

// Update team members data
const teamMembers = [
  {
    name: 'Varun',
    role: 'Product Manager',
    description: 'Product strategy expert specializing in AI-driven solutions and customer experience optimization',
    email: 'varun@justbookme.com'
  },
  {
    name: 'Aryan',
    role: 'AI Engineer',
    description: 'Specialist in conversational AI and natural language processing',
    email: 'aryan@justbookme.com'
  },
  {
    name: 'Raghav',
    role: 'Integration Specialist',
    description: 'Expert in seamless chatbot deployment and business integration',
    email: 'raghav@justbookme.com'
  }
];

// const openEmail = (email: string) => {
//   window.location.href = `mailto:${email}`;
// };

// Update SEO metadata
const { setPageMeta } = useCommonMeta();

onMounted(() => {
  setPageMeta(
    'About Us', 
    'Meet the team behind JustBookMe - Your intelligent appointment scheduling and customer engagement solution powered by advanced AI technology.'
  );
  window.scrollTo(0, 0);
});
</script>

<template>
  <main>
    <!-- Hero Section -->
    <div class="relative isolate bg-background overflow-hidden">
      <AuroraBackground class="absolute inset-0 -z-10 opacity-100" />
      <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8 text-center z-20">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8">
          Revolutionizing <span class="text-primary">Customer Engagement</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-foreground px-4 max-w-2xl mx-auto">
          We're transforming business communication with AI-powered appointment scheduling and customer service solutions.
        </p>
      </div>
    </div>

    <!-- Team Members Section -->
    <div class="relative bg-background py-16 z-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card v-for="member in teamMembers" :key="member.name" 
                class="group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-full">
            <CardHeader class="h-auto pb-4">
              <div class="flex items-center gap-3 mb-2">
                <div class="h-8 w-8 rounded flex items-center justify-center bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <CardTitle>{{ member.name }}</CardTitle>
              </div>
              <p class="text-primary font-medium">{{ member.role }}</p>
            </CardHeader>
            <CardContent class="pt-0">
              <p class="text-muted-foreground text-sm mb-4">{{ member.description }}</p>
              <a 
                :href="`mailto:${member.email}`"
                class="text-sm text-primary hover:underline inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ member.email }}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Remove Mission Section and go directly to Footer -->
    <div class="relative bg-background z-10">
      <Footer />
    </div>
  </main>
  
</template>

<style scoped>
main {
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

.group {
  @apply w-full;
}

@media (max-width: 768px) {
  .group {
    @apply max-w-full mx-auto;
  }
}

:deep(.aurora-background) {
  opacity: 1;
  pointer-events: none;
}

:deep(.footer) {
  position: relative;
  z-index: 20;
  background-color: rgb(var(--background));
}
</style>
