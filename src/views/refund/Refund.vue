<script setup lang="ts">
import { onMounted } from 'vue';
import { useCommonMeta } from '../../composables/useCommonMeta';
import Navbar from '../../components/layout/Navbar.vue'
import Footer from '../../components/layout/Footer.vue'

// Get the setPageMeta function from our composable
const { setPageMeta } = useCommonMeta();

onMounted(() => {
  // Set the meta tags for the refund policy page
  setPageMeta(
    'Refund Policy', 
    'Learn about JustBookMe refund policy. We outline our refund eligibility criteria, process, and timelines to ensure transparency in all our transactions.'
  );
  
  // Scroll to top when the page loads
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
});
</script>

<template>
  <main class="dark:bg-black bg-white">
    <Navbar />
    <!-- Hero Section -->
    <div class="relative isolate">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-48 lg:px-24 text-center" v-fade="{ duration: 800 }">
        <h1 class="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-5xl">
          Refund Policy
        </h1>
        <p class="mt-6 text-base sm:text-xl dark:text-gray-200 text-gray-700">
          We strive to provide the best service possible. If you're not satisfied, please read our refund policy to understand how we handle refund requests.
        </p>
      </div>
    </div>

    <!-- Refund Policy Content Section -->
    <div class="dark:bg-black bg-gray-50 py-8 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
        <!-- Eligibility for Refund -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Eligibility for Refund</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            Refunds are applicable under the following circumstances:
          </p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-2 list-disc pl-5">
            <li>Service not delivered as promised within the agreed timeframe.</li>
            <li>Technical issues caused by our system that result in failed deliverables.</li>
            <li>Duplicate payments or other billing errors.</li>
          </ul>
        </div>

        <!-- Non-Refundable Cases -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Non-Refundable Cases</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            Refunds will not be provided in the following cases:
          </p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-2 list-disc pl-5">
            <li>Change of mind after service initiation.</li>
            <li>Failure to utilize services due to customer-related issues.</li>
            <li>Violation of our terms and conditions.</li>
          </ul>
        </div>

        <!-- Refund Request Process -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Refund Request Process</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            To request a refund, follow these steps:
          </p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-2 list-disc pl-5">
            <li>Visit our <router-link to="/contact" class="text-blue-500 underline">contact page</router-link> to submit your request.</li>
            <li>Provide a detailed explanation of your issue, including any supporting evidence.</li>
            <li>Our team will review your request and respond within 7 business days.</li>
          </ul>
        </div>

        <!-- Refund Timelines -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Refund Timelines</h2>
          <p class="dark:text-gray-300 text-gray-600">
            Approved refunds will be processed within 10 business days. The amount will be credited to your original payment method.
          </p>
        </div>

        <!-- Contact Support -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Need Help?</h2>
          <p class="dark:text-gray-300 text-gray-600">
            If you have any questions about our refund policy, please visit our <router-link to="/contact" class="text-blue-500 underline">contact page</router-link> for assistance.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<style lang="postcss">
/* Apply the same theme styling as the privacy policy */
:global(body) {
  @apply dark:bg-black bg-white;
}

h1, h2 {
  @apply tracking-tight;
}

ul {
  @apply list-disc pl-5 dark:text-gray-300 text-gray-600;
}

.bg-zinc-900 {
  @apply dark:bg-[#111111] bg-white;
}

.p-8 {
  padding: 2rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .text-gray-600, .dark\:text-gray-300 {
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.25rem;
  }

  .shadow-lg {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
