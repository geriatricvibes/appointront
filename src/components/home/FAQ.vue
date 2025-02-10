<template>
  <section class="relative py-8 md:py-24">
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Frequently Asked Questions
        </h2>
        <p class="text-sm md:text-lg text-muted-foreground px-4 md:px-0">
          Find answers to common questions about our services and features
        </p>
      </div>

      <div class="mt-8 md:mt-20">
        <Accordion type="single" collapsible class="w-full space-y-3">
          <AccordionItem
            v-for="(item, index) in faqItems"
            :key="index"
            :value="`item-${index}`"
            class="border rounded-lg bg-card/60 backdrop-blur-sm shadow-none"
          >
            <AccordionTrigger class="text-left px-4 md:px-6 py-4 hover:no-underline">
              <span class="text-sm md:text-base font-medium text-foreground pr-8">{{ item.question }}</span>
            </AccordionTrigger>
            <AccordionContent class="px-4 md:px-6 pb-4">
              <p class="text-muted-foreground text-xs md:text-base leading-relaxed">
                {{ item.answer }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: "What is JustBookMe?",
    answer: "JustBookMe is an intelligent chatbot solution that seamlessly integrates with your website and phone systems to automate appointment scheduling, answer customer queries, and manage meeting reminders. It's designed to help businesses improve their customer engagement and appointment attendance rates."
  },
  {
    question: "How does the appointment scheduling feature work?",
    answer: "The chatbot can access your business calendar, show available time slots, and help customers book appointments that work for both parties. It handles all the scheduling logistics automatically, including confirmation messages and calendar invites."
  },
  {
    question: "What types of businesses can use JustBookMe?",
    answer: "JustBookMe is perfect for any business that relies on appointments or meetings, such as medical clinics, salons, consulting firms, real estate agencies, and professional services. It can be customized to match your specific business needs."
  },
  {
    question: "How does the reminder system work?",
    answer: "JustBookMe sends automated reminders via SMS, email, or chat messages at customizable intervals before the appointment. This helps reduce no-shows and allows customers to easily reschedule if needed."
  },
  {
    question: "Can the chatbot handle customer queries?",
    answer: "Yes! The chatbot is trained to answer common questions about your business, services, operating hours, pricing, and policies. For complex queries, it can seamlessly transfer the conversation to a human representative."
  },
  {
    question: "How easy is it to integrate JustBookMe?",
    answer: "Integration is straightforward - we provide simple code snippets to add to your website, and can connect with your existing phone systems. The setup process typically takes less than a day, and our team provides full support throughout the integration."
  },
  {
    question: "Is the scheduling data secure?",
    answer: "Absolutely. We use enterprise-grade encryption for all data transmission and storage. Your business and customer information is protected with the highest security standards, and we are fully compliant with privacy regulations."
  },
  {
    question: "Can I customize the chatbot's responses?",
    answer: "Yes, the chatbot's responses, tone, and language can be fully customized to match your brand voice. You can also set specific business rules, availability windows, and handling procedures for different types of appointments."
  }
]
</script>

<style scoped>
/* Mobile-first accordion styling */
:deep(.accordion-trigger) {
  @apply transition-all duration-200;
}

:deep(.accordion-content) {
  @apply overflow-hidden transition-all duration-200;
}

/* Custom styling for accordion items */
:deep(.accordion-item) {
  @apply border-border/50 transition-all duration-200;
}

:deep(.accordion-item[data-state='open']) {
  @apply bg-card/80;
}

/* Optimize chevron animation */
:deep(.accordion-trigger-icon) {
  @apply transition-transform duration-200;
}

/* Add touch-friendly tap targets */
@media (max-width: 768px) {
  :deep(.accordion-trigger) {
    @apply min-h-[48px];
  }
  
  :deep(.accordion-content) {
    @apply text-sm leading-relaxed;
  }
}

/* Smooth transitions */
.accordion-enter-active,
.accordion-leave-active {
  @apply transition-all duration-200 ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  @apply opacity-0 transform -translate-y-2;
}
</style> 