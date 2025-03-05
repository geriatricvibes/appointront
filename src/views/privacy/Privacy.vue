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
  // Set the meta tags for the privacy policy page
  setPageMeta(
    'Privacy Policy', 
    'Privacy policy for JustBookMe services. Learn how we collect, use, and protect your personal information when using our platform.'
  );
  
  // Scroll to top when component is mounted
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Add counter reset
const sections = [
  'Consent', 
  'Information We Collect', 
  'How We Use Your Information', 
  'Log Files', 
  'Cookies and Web Beacons', 
  'Advertising Partners Privacy Policies', 
  'Third Party Privacy Policies', 
  'CCPA Privacy Rights', 
  'GDPR Data Protection Rights', 
  "Children's Information", 
  'Contact Us'
]
</script>

<template>
  <main class="dark:bg-black bg-white">
    <Navbar />
    <div class="relative">
      <div class="relative z-10">
        <div class="container mx-auto px-4 relative z-10 py-12 md:py-40">
          <div class="prose dark:prose-invert max-w-4xl mx-auto [counter-reset:section_counter]">
            <h1 class="text-2xl md:text-4xl font-medium mb-4 md:mb-6 text-center dark:text-white text-black">Privacy Policy</h1>
            <p class="text-xs md:text-sm mb-6 md:mb-8 text-center dark:text-gray-300 text-gray-700">Last updated: {{ lastUpdated }}</p>
            <p class="text-sm md:text-base mb-6 md:mb-8 dark:text-gray-200 text-gray-800">This Privacy Policy describes how JustBookMe.AI ("we", "us", or "our") collects, uses, and discloses your personal information when you use our services.</p>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[0] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">By using our website and services, you hereby consent to our Privacy Policy and agree to its terms.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[1] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
              
              <p class="mb-4 dark:text-gray-200 text-gray-800">If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
              
              <p class="dark:text-gray-200 text-gray-800">When you register for an account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[2] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">We use the information we collect in various ways, including to:</p>
              
              <ul class="mb-4 list-disc pl-6 space-y-2 dark:text-gray-200 text-gray-800">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our website and services</li>
                <li>Understand and analyze how you use our website and services</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[3] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">JustBookMe.AI follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics.</p>
              
              <p class="dark:text-gray-200 text-gray-800">The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[4] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">Like any other website, JustBookMe.AI uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
              
              <p class="dark:text-gray-200 text-gray-800">The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[5] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on JustBookMe.AI, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
              
              <p class="dark:text-gray-200 text-gray-800">Note that JustBookMe.AI has no access to or control over these cookies that are used by third-party advertisers.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[6] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">JustBookMe.AI's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
              
              <p class="dark:text-gray-200 text-gray-800">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[7] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">Under the CCPA, among other rights, California consumers have the right to:</p>
              
              <ul class="mb-4 list-disc pl-6 space-y-2 dark:text-gray-200 text-gray-800">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
              
              <p class="dark:text-gray-200 text-gray-800">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[8] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              
              <ul class="mb-4 list-disc pl-6 space-y-2 dark:text-gray-200 text-gray-800">
                <li class="mb-2">The right to access: You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                <li class="mb-2">The right to rectification: You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li class="mb-2">The right to erasure: You have the right to request that we erase your personal data, under certain conditions.</li>
                <li class="mb-2">The right to restrict processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li class="mb-2">The right to object to processing: You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li class="mb-2">The right to data portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              
              <p class="dark:text-gray-200 text-gray-800">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[9] }}
              </h2>
              <p class="mb-4 dark:text-gray-200 text-gray-800">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
              
              <p class="dark:text-gray-200 text-gray-800">JustBookMe.AI does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            </section>

            <section class="mb-6 md:mb-8">
              <h2 class="text-lg md:text-xl font-medium mb-3 md:mb-4 flex items-center gap-2 md:gap-3 before:[counter-increment:section_counter] before:content-[counter(section_counter)] before:bg-primary/10 before:w-6 md:before:w-8 before:h-6 md:before:h-8 before:rounded-full before:flex before:items-center before:justify-center before:text-primary before:text-sm md:before:text-base">
                {{ sections[10] }}
              </h2>
              <p class="dark:text-gray-200 text-gray-800 mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>

              <ul class="text-sm md:text-base list-disc pl-6 space-y-2 dark:text-gray-200 text-gray-800">
                <li>By visiting our website: <a href="https://{{ website }}" class="text-primary hover:text-primary/80">{{ website }}</a></li>
                <li>By sending us an email: <a href="mailto:{{ email }}" class="text-primary hover:text-primary/80">{{ email }}</a></li>
                <li>By mail: <pre class="text-sm whitespace-pre-line">{{ companyInfo }}</pre></li>
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
    @apply dark:bg-black bg-white;
  }

  h1, h2 {
    @apply tracking-tight dark:text-white text-black;
  }

  h3 {
    @apply dark:text-gray-100 text-gray-900;
  }

  p {
    @apply dark:text-gray-200 text-gray-800;
  }

  ul {
    @apply list-disc pl-5 dark:text-gray-200 text-gray-800;
  }

  /* Fix for text color in dark/light mode */
  .prose {
    @apply dark:text-gray-200 text-gray-800;
  }

  /* Ensure section numbers are visible */
  .before\:text-primary {
    @apply before:dark:text-white before:text-black;
  }

  /* Ensure links are visible */
  a {
    @apply dark:text-blue-400 text-blue-600 hover:underline;
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