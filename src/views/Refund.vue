<script setup lang="ts">

const lastUpdated = '08/02/2025'
const email = 'support@geriatricscholar.com'
</script>

<template>
  <div class="relative">

    <div class="relative z-10">

      
      <main class="container mx-auto px-4 relative z-10 py-12 md:py-40">
        <div class=" md:pt-0 prose prose-invert max-w-4xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-medium mb-4 md:mb-6 text-center">Return & Refund Policy</h1>
          <p class="text-xs md:text-sm mb-6 md:mb-8 text-center">Last updated: {{ lastUpdated }}</p>
          
          <p class="mb-6 md:mb-8 text-sm md:text-base">Thank you for shopping at GeriatricScholar. The following terms are applicable for any products that you have purchased from us.</p>

          <section class="mb-6 md:mb-8">
            <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4">Eligibility for Refunds</h2>
            <p class="text-sm md:text-base">We offer refunds under the following circumstances:</p>
            <ul class="list-disc pl-4 md:pl-6 space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>If the service is not delivered as promised due to an error on our end.</li>
              <li>If a technical issue caused by our platform prevents you from accessing the features you paid for, and the issue cannot be resolved within a reasonable timeframe.</li>
              <li>If you cancel your subscription within the refund period outlined below.</li>
            </ul>
          </section>

          <section class="mb-6 md:mb-8">
            <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4">Refund Period</h2>
            <p class="text-sm md:text-base">Refund requests must be made within 5 days of the payment date. Requests made after this period will not be eligible for a refund.</p>
          </section>

          <section class="mb-6 md:mb-8">
            <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4">Non-Refundable Cases</h2>
            <p class="text-sm md:text-base">Refunds will not be granted under the following conditions:</p>
            <ul class="list-disc pl-4 md:pl-6 space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>If you change your mind after purchasing a subscription or service.</li>
              <li>If you fail to use the service during the subscription period.</li>
              <li>If the issue is caused by third-party software or tools not affiliated with our platform.</li>
            </ul>
          </section>

          <section class="mb-6 md:mb-8">
            <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4">Refund Process</h2>
            <p class="text-sm md:text-base">To request a refund, please follow these steps:</p>
            <ol class="list-decimal pl-4 md:pl-6 space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>Contact our support team at <a href="mailto:{{ email }}" class="text-primary hover:text-primary/80">{{ email }}</a></li>
              <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
              <li>Our team will review your request and respond within 3-5 business days.</li>
              <li>If your request is approved, the refund will be processed to your original payment method within 7-10 business days.</li>
            </ol>
          </section>

          <section class="mb-6 md:mb-8">
            <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4">Contact Us</h2>
            <p class="text-sm md:text-base">If you have any questions about this Refund Policy or require assistance, please reach out to us:</p>
            <p class="text-sm md:text-base">Email: <a href="mailto:{{ email }}" class="text-primary hover:text-primary/80">{{ email }}</a></p>
          </section>
        </div>
      </main>

    </div>
  </div>
</template> 