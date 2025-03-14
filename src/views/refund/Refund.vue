<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommonMeta } from '@/composables/useCommonMeta'

// Get the setPageMeta function from our composable
const { setPageMeta } = useCommonMeta();

const lastUpdated = '08/02/2025'
const email = 'contact@justbookme.ai'
const website = 'www.justbookme.ai'
const companyInfo = '9629033 Canada INC DBA JustBookMe.AI\n1000 Innovation Dr Suite 500\nKanata, ON K2K 3E7\nCanada'

onMounted(() => {
  // Set the meta tags for the refund policy page
  setPageMeta(
    'Refund Policy', 
    'Refund policy for JustBookMe services. Learn about our return and refund conditions, eligibility, and process.'
  );
  
  // Scroll to top when component is mounted
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Add counter reset for consistent styling with other policy pages
const sections = [
  'Eligibility for Refunds',
  'Refund Period',
  'Non-Refundable Cases',
  'Refund Process',
  'Contact Us'
]
</script>

<template>
  <main class="bg-background policy-page">
    <div class="relative">
      <div class="relative z-10">
        <div class="container mx-auto px-4 relative z-10 py-12 md:py-40">
          <div class="prose max-w-4xl mx-auto [counter-reset:section_counter]">
            <h1 class="text-2xl md:text-4xl font-medium mb-4 md:mb-6 text-center text-foreground">Return & Refund Policy</h1>
            <p class="text-xs md:text-sm mb-6 md:mb-8 text-center">Last updated: {{ lastUpdated }}</p>
            <p class="text-sm md:text-base mb-6 md:mb-8">Thank you for choosing JustBookMe.AI. The following terms are applicable for any services that you have purchased from us.</p>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[0] }}
              </h2>
              <p class="mb-4">We offer refunds under the following circumstances:</p>
              <ul class="list-disc pl-6 space-y-2 mb-4">
                <li>If the service is not delivered as promised due to an error on our end.</li>
                <li>If a technical issue caused by our platform prevents you from accessing the features you paid for, and the issue cannot be resolved within a reasonable timeframe.</li>
                <li>If you cancel your subscription within the refund period outlined below.</li>
              </ul>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[1] }}
              </h2>
              <p>Refund requests must be made within 5 days of the payment date. Requests made after this period will not be eligible for a refund.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[2] }}
              </h2>
              <p class="mb-4">Refunds will not be granted under the following conditions:</p>
              <ul class="list-disc pl-6 space-y-2 mb-4">
                <li>If you change your mind after purchasing a subscription or service.</li>
                <li>If you fail to use the service during the subscription period.</li>
                <li>If the issue is caused by third-party software or tools not affiliated with our platform.</li>
              </ul>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[3] }}
              </h2>
              <p class="mb-4">To request a refund, please follow these steps:</p>
              <ol class="list-decimal pl-6 space-y-2 mb-4">
                <li>Contact our support team at <a href="mailto:{{ email }}" class="text-primary hover:text-primary/80">{{ email }}</a></li>
                <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
                <li>Our team will review your request and respond within 3-5 business days.</li>
                <li>If your request is approved, the refund will be processed to your original payment method within 7-10 business days.</li>
              </ol>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[4] }}
              </h2>
              <p class="mb-4">If you have any questions about this Refund Policy, You can contact us:</p>

              <ul class="text-sm md:text-base list-disc pl-6 space-y-2">
                <li>By visiting our website: <a href="https://{{ website }}" class="text-primary hover:text-primary/80">{{ website }}</a></li>
                <li>By sending us an email: <a href="mailto:{{ email }}" class="text-primary hover:text-primary/80">{{ email }}</a></li>
                <li>By mail: <span class="text-sm whitespace-pre-line">{{ companyInfo }}</span></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

