<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommonMeta } from '@/composables/useCommonMeta'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

// Get the setPageMeta function from our composable
const { setPageMeta } = useCommonMeta();

const lastUpdated = '08/02/2025'
const email = 'contact@justbookme.ai'
const website = 'www.justbookme.ai'
const companyInfo = '9629033 Canada INC DBA JustBookMe.AI\n1000 Innovation Dr Suite 500\nKanata, ON K2K 3E7\nCanada'

onMounted(() => {
  // Set the meta tags for the terms of service page
  setPageMeta(
    'Terms of Service', 
    'Terms and conditions for using JustBookMe services. Read our terms of service to understand your rights and obligations when using our platform.'
  );
  
  // Scroll to top when component is mounted
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const sections = [
  'Acknowledgment',
  'User Accounts',
  'Copyright Policy',
  'Intellectual Property',
  'Your Feedback to Us',
  'Links to Other Websites',
  'Termination',
  'Limitation of Liability',
  '"AS IS" and "AS AVAILABLE" Disclaimer',
  'Governing Law',
  'Disputes Resolution',
  'Changes to These Terms and Conditions',
  'Contact Us'
]
</script>

<template>
  <main class="bg-white">
    <Navbar />
    <div class="relative">
      <div class="relative z-10">
        <div class="container mx-auto px-4 relative z-10 py-12 md:py-40">
          <div class="prose max-w-4xl mx-auto [counter-reset:section_counter]">
            <h1 class="text-2xl md:text-4xl font-medium mb-4 md:mb-6 text-center text-black">Terms and Conditions</h1>
            <p class="text-xs md:text-sm mb-6 md:mb-8 text-center">Last updated: {{ lastUpdated }}</p>
            <p class="text-sm md:text-base mb-6 md:mb-8">Please read these terms and conditions carefully before using Our Service.</p>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[0] }}
                </h2>
              <p class="mb-4">These are the Terms and Conditions governing the use of this Service and the agreement that operates between you and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>

              <p class="mb-4">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>

              <p class="mb-4">By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these Terms and Conditions, then you may not access the Service.</p>

              <p class="mb-4">Your access to and use of the Service is also conditioned on your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of your personal information when you use the Application or the Website and tells you about your privacy rights and how the law protects you. Please read Our Privacy Policy carefully before using Our Service.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[1] }}
              </h2>
              <p class="mb-4">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in the immediate termination of your account.</p>

              <p class="mb-4">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service or a Third-Party Social Media Service.</p>

              <p class="mb-4">You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

              <p class="mb-4">You may not use as a username the name of another person or entity that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[2] }}
              </h2>
              <h3 class="text-lg font-medium mb-2">Intellectual Property Infringement</h3>
              <p class="mb-4">All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of JustBookMe.AI and are protected by international copyright, trademark, and other intellectual property laws.</p>

              <h3 class="text-lg font-medium mb-2 mt-4">DMCA Notice and DMCA Procedure for Copyright Infringement Claims</h3>
              <p class="mb-4">You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>

              <ul class="list-disc pl-6 space-y-2 mb-4">
                <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</li>
                <li>A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
                <li>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
                <li>Your address, telephone number, and email address.</li>
                <li>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                    </ul>

              <p>You can contact our copyright agent via email at {{ email }}. Upon receipt of a notification, the Company will take whatever action, in its sole discretion, it deems appropriate, including removing the challenged content from the Service.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[3] }}
                </h2>
              <p class="mb-4">The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of the Company and its licensors.</p>

              <p class="mb-4">The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>

              <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[4] }}
                </h2>
              <p>We value your feedback and are always looking for ways to improve our services. If you have any questions, comments, or concerns about our services, please feel free to contact us.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[5] }}
                </h2>
              <p>Our Service may contain links to third-party websites or services that are not owned or controlled by JustBookMe.AI. JustBookMe.AI has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that JustBookMe.AI shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such website or service.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[6] }}
                </h2>
              <p>JustBookMe.AI may terminate your access to and use of the Service at any time, without notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[7] }}
              </h2>
              <p>JustBookMe.AI shall not be liable for any damages arising out of or in connection with the use of the Service.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[8] }}
                </h2>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. JustBookMe.AI makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on or through the Service.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[9] }}
                </h2>
              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of the Country, without regard to its conflict of law provisions.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[10] }}
                </h2>
              <p>Any dispute arising out of or related to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of the Country.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[11] }}
                </h2>
              <p>JustBookMe.AI reserves the right, at its sole discretion, to modify or replace these Terms and Conditions at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[12] }}
                </h2>
              <p class="text-sm md:text-base mb-4">If you have any questions about these Terms and Conditions, You can contact us:</p>

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
    <Footer />
  </main>
</template>

<style lang="postcss">
    :global(body) {
        @apply bg-white;
    }

    h1, h2 {
    @apply tracking-tight text-black;
  }

  h3 {
    @apply text-gray-900;
  }

  p {
    @apply text-gray-800;
  }

  ul {
    @apply list-disc pl-5 text-gray-800;
  }

  /* Fix for text color */
  .prose {
    @apply text-gray-800 font-normal;
  }

  /* Ensure section numbers are visible */
  .before\:text-primary {
    @apply before:text-gray-800 before:bg-transparent;
  }

  /* Ensure links are visible */
  a {
    @apply text-blue-600 hover:underline;
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


