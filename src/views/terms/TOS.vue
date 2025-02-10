<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '../../components/layout/Navbar.vue'
import Footer from '../../components/layout/Footer.vue'
import { useHead } from '@vueuse/head'

// Add useMeta composable if you're using @vueuse/head or similar
useHead({
  title: 'Terms of Service | geriatricwriters',
  meta: [
    { name: 'description', content: 'Terms and conditions for using geriatricwriters services. Read our terms of service to understand your rights and obligations when using our platform.' },
    { property: 'og:title', content: 'Terms of Service | geriatricwriters' },
    { property: 'og:description', content: 'Terms and conditions for using geriatricwriters services. Read our terms of service to understand your rights and obligations when using our platform.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://geriatricwriters.com/terms-of-use' },
    { name: 'twitter:title', content: 'Terms of Service | geriatricwriters' },
    { name: 'twitter:description', content: 'Terms and conditions for using geriatricwriters services. Read our terms of service to understand your rights and obligations when using our platform.' },
  ]
})

onMounted(() => {
  // Scroll to top when component is mounted
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
<template>
  <main class="dark:bg-black bg-white">
    <Navbar />
    <!-- Hero Section -->
    <div class="relative isolate">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-48 lg:px-24 text-center">
            <h1 class="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-5xl">
                Terms and Conditions
            </h1>
            <p class="dark:text-gray-300 text-gray-600 text-base sm:text-xl mt-6">
                Please read these terms and conditions carefully before using Our Service.
            </p>
        </div>
    </div>

    <!-- Terms Content Section -->
    <div class="dark:bg-black bg-gray-50 py-8 sm:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
            <!-- Interpretation and Definitions -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Interpretation and Definitions
                </h2>
                
                <!-- Interpretation -->
                <div class="dark:text-gray-300 text-gray-600 space-y-4 sm:space-y-6">
                    <h3 class="text-xl sm:text-2xl font-semibold dark:text-white text-black mb-3 sm:mb-4">
                        Interpretation
                    </h3>
                    <p>
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                    </p>

                    <p>
                        These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                    </p>

                    <p>
                        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.
                    </p>

                    <p>
                        By accessing or using the Service, You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions, then You may not access the Service.
                    </p>

                    <p>
                        You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                    </p>

                    <p>
                        We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                    </p>

                    <p>
                        Some states or jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, so some of the above limitations may not apply to You.
                    </p>

                    <!-- Definitions -->
                    <h3 class="text-2xl font-semibold dark:text-white text-black mb-4">Definitions</h3>
                    <p class="mb-4">
                        For the purposes of these Terms and Conditions:
                    </p>
                    <ul class="space-y-4 list-disc pl-5">
                        <li><span class="font-bold dark:text-white text-black">Affiliate:</span> <span class="dark:text-gray-200 text-black">means an entity that controls, is controlled by, or is under common control with a party...</span></li>
                        <li><span class="font-bold dark:text-white text-black">Country:</span> refers to: United States.</li>
                        <li><span class="font-bold dark:text-white text-black">Company:</span> (referred to as either "the Company," "We," "Us," or "Our" in this Agreement) refers to GeriatricWriters.</li>
                        <li><span class="font-bold dark:text-white text-black">Device:</span> means any device that can access the Service...</li>
                        <li><span class="font-bold dark:text-white text-black">Service:</span> refers to the Website.</li>
                        <li><span class="font-bold dark:text-white text-black">Terms and Conditions:</span> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                        <li><span class="font-bold dark:text-white text-black">Third-party Social Media Service:</span> means any services or content (including data, information, products, or services) provided by a third-party that may be displayed, included, or made available by the Service.</li>
                        <li><span class="font-bold dark:text-white text-black">Website:</span> refers to GeriatricWriters, accessible from https://geriatricwriters.com.</li>
                        <li><span class="font-bold dark:text-white text-black">You:</span> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                    </ul>
                </div>
            </div>

            <!-- Acknowledgment -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Acknowledgment
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.
                    </p>
                    <p>
                        By accessing or using the Service, You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions, then You may not access the Service.
                    </p>
                    <p>
                        You represent that You are over the age of 18. The Company does not permit those under 18 to use the Service.
                    </p>
                    <p>
                        Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
                    </p>
                </div>
            </div>

            <!-- Links to Other Websites -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Links to Other Websites
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                    </p>
                    <p>
                        The Company has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                    </p>
                    <p>
                        We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                    </p>
                </div>
            </div>

            <!-- Termination -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Termination
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.
                    </p>
                </div>
            </div>

            <!-- Limitation of Liability -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Limitation of Liability
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                    </p>
                    <p>
                        To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data, or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms).
                    </p>
                    <p>
                        Some states or jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, so some of the above limitations may not apply to You.
                    </p>
                </div>
            </div>

            <!-- Limitation of Liability section -->

            <!-- "AS IS" and "AS AVAILABLE" Disclaimer -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    "AS IS" and "AS AVAILABLE" Disclaimer
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company disclaims all warranties, whether express, implied, statutory, or otherwise, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                </div>
            </div>

            <!-- Governing Law -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Governing Law
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
                    </p>
                </div>
            </div>

            <!-- Disputes Resolution -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Disputes Resolution
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                    </p>
                </div>
            </div>

            <!-- Disputes Resolution section -->

            <!-- Changes to These Terms and Conditions -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Changes to These Terms and Conditions
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material, We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms.
                    </p>
                </div>
            </div>

            <!-- Contact Us -->
            <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
                <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">
                    Contact Us
                </h2>
                <div class="dark:text-gray-300 text-gray-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        If you have any questions about these Terms and Conditions, You can contact us by visiting our contact us page.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
  </main>
</template>

<style lang="postcss">
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

    /* Remove problematic responsive utilities from @apply */
    .content-section {
        padding: 1rem;
    }
    @screen sm {
        .content-section {
            padding: 2rem;
        }
    }

    .content-card {
        @apply rounded-md shadow;
    }
    @screen sm {
        .content-card {
            @apply rounded-lg shadow-lg;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.8s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
