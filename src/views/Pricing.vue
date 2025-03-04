<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/vue'

// Add SEO metadata
useHead({
  title: 'Pricing | GeriatricScholar - Simple, Transparent Plans',
  meta: [
    {
      name: 'description',
      content: 'Flexible pricing plans starting at $0/month. Get unlimited context window, up to 250 queries per month, and translation support for 33+ languages. Choose between Hobby and Pro plans.'
    },
    {
      name: 'keywords',
      content: 'GeriatricScholar pricing, writing assistant plans, translation services pricing, professional writing tools, multilingual translation pricing, free writing tools, affordable translation services'
    },
    // Open Graph
    {
      property: 'og:title',
      content: 'Pricing | GeriatricScholar - Simple, Transparent Plans'
    },
    {
      property: 'og:description',
      content: 'Flexible pricing plans starting at $0/month. Get unlimited context window, up to 250 queries per month, and translation support for 33+ languages. Choose between Hobby and Pro plans.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://geriatricscholar.com/pricing'
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Pricing | GeriatricScholar - Simple, Transparent Plans'
    },
    {
      name: 'twitter:description',
      content: 'Flexible pricing plans starting at $0/month. Get unlimited context window, up to 250 queries per month, and translation support for 33+ languages. Choose between Hobby and Pro plans.'
    }
  ]
})

const writesPlans = [
  {
    name: 'Feature',
    hobby: 'Hobby',
    pro: 'Pro',
  },
  {
    name: 'Price',
    hobby: '$0/month',
    pro: '$10/month',
  },
  {
    name: 'Queries',
    hobby: '50 per month',
    pro: '250 per month',
  },
  {
    name: 'Context Window',
    hobby: 'Unlimited',
    pro: 'Unlimited',
  },
  {
    name: 'Discord Integration',
    hobby: 'Yes',
    pro: 'Yes',
  },
]

const translatesPlans = [
  {
    name: 'Feature',
    hobby: 'Hobby',
    pro: 'Pro',
  },
  {
    name: 'Price',
    hobby: '$0/month',
    pro: '$10/month',
  },
  {
    name: 'Translation Words',
    hobby: '10,000 per month',
    pro: 'Unlimited',
  },
  {
    name: 'Languages',
    hobby: '33+ languages',
    pro: '33+ languages',
  },
]
</script>

<template>
  <div class="relative">
    <div class="relative z-10 flex flex-col">
      <section class="container mx-auto px-4 pt-16 md:pt-32 pb-8 md:pb-16 flex-grow">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter">
            Simple, transparent pricing
          </h2>
          <p class="mt-3 md:mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
             All plans include full access to our core features.
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <!-- GeriatricWrites Table -->
          <div class="overflow-x-auto">
            <h3 class="text-xl md:text-2xl font-medium mb-3 md:mb-4">GeriatricWriters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[200px]">Feature</TableHead>
                  <TableHead>
                    <div class="flex items-center gap-2">
                      <Icon icon="ri:quill-pen-line" class="h-5 w-5" />
                      Hobby
                      <Badge variant="secondary" class="ml-2">Popular</Badge>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div class="flex items-center gap-2">
                      <Icon icon="ri:quill-pen-fill" class="h-5 w-5" />
                      Pro
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="plan in writesPlans.slice(1)" :key="plan.name">
                  <TableCell class="font-medium">{{ plan.name }}</TableCell>
                  <TableCell>{{ plan.hobby }}</TableCell>
                  <TableCell>{{ plan.pro }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- GeriatricTranslates Table -->
          <div class="overflow-x-auto">
            <h3 class="text-xl md:text-2xl font-medium mb-3 md:mb-4">GeriatricTranslators</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[200px]">Feature</TableHead>
                  <TableHead>
                    <div class="flex items-center gap-2">
                      <Icon icon="ri:translate" class="h-5 w-5" />
                      Hobby
                      <Badge variant="secondary" class="ml-2">Popular</Badge>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div class="flex items-center gap-2">
                      <Icon icon="ri:translate-2" class="h-5 w-5" />
                      Pro
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="plan in translatesPlans.slice(1)" :key="plan.name">
                  <TableCell class="font-medium">{{ plan.name }}</TableCell>
                  <TableCell>{{ plan.hobby }}</TableCell>
                  <TableCell>{{ plan.pro }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Disclaimer -->
          <div class="text-sm text-muted-foreground text-center mt-6">
            <p>Note: Words are calculated based on number of characters with 5 characters counting as one word.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template> 