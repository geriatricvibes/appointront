<script lang="ts">
import Navbar from '../../components/layout/Navbar.vue'
import Footer from '../../components/layout/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  },
  head: {
    title: 'Privacy Policy | JustBookMe',
    meta: [
      {
        name: 'description',
        content: 'Privacy Policy for JustBookMe - Learn how we collect, use, and protect your personal information. Read our comprehensive privacy policy to understand your rights and our data practices.'
      },
      {
        property: 'og:title',
        content: 'Privacy Policy | JustBookMe'
      },
      {
        property: 'og:description',
        content: 'Privacy Policy for JustBookMe - Learn how we collect, use, and protect your personal information. Read our comprehensive privacy policy to understand your rights and our data practices.'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://justbookme.com/privacy-policy'
      },
      {
        name: 'twitter:title',
        content: 'Privacy Policy | JustBookMe'
      },
      {
        name: 'twitter:description',
        content: 'Privacy Policy for JustBookMe - Learn how we collect, use, and protect your personal information. Read our comprehensive privacy policy to understand your rights and our data practices.'
      }
    ]
  }
}
</script>

<template>
  <main class="dark:bg-black bg-white">
    <Navbar />
    <!-- Hero Section -->
    <div class="relative isolate">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-48 lg:px-24 text-center" v-fade="{ duration: 800 }">
        <h1 class="text-3xl font-bold tracking-tight dark:text-white text-black sm:text-5xl">
          Privacy Policy
        </h1>
        <p class="mt-6 text-base sm:text-xl dark:text-gray-200 text-gray-700">
          We value your privacy and are committed to protecting your personal information. Please read the following privacy policy to understand how we collect, use, and safeguard your data.
        </p>
      </div>
    </div>

    <!-- Privacy Policy Content Section -->
    <div class="dark:bg-black bg-gray-50 py-8 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
        <!-- Interpretation and Definitions -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Interpretation and Definitions</h2>
          <h3 class="text-xl sm:text-2xl font-semibold dark:text-white text-black mb-3 sm:mb-4">Interpretation</h3>
          <p class="dark:text-gray-300 text-gray-600 mb-6">
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
          </p>

          <h3 class="text-2xl font-semibold dark:text-white text-black mb-4">Definitions</h3>
          <p class="dark:text-gray-300 text-gray-600 mb-4">For the purposes of this Privacy Policy:</p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-4 list-disc pl-5">
            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Company</strong> (referred to as either "the Company," "We," "Us," or "Our" in this Agreement) refers to JustBookMe.</li>
            <li><strong>Cookies</strong> are small files placed on Your computer, mobile device, or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
            <li><strong>Country</strong> refers to the United States.</li>
            <li><strong>Device</strong> means any device that can access the Service, such as a computer, cellphone, or digital tablet.</li>
            <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service, or to assist the Company in analyzing how the Service is used.</li>
            <li><strong>Third-party Social Media Service</strong> refers to any website or social network website through which a User can log in or create an account to use the Service.</li>
            <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
            <li><strong>Website</strong> refers to JustBookMe, accessible from https://justbookme.com.</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          </ul>
        </div>

        <!-- Types of Data Collected -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Types of Data Collected</h2>
          <h3 class="text-xl sm:text-2xl font-semibold dark:text-white text-black mb-3 sm:mb-4">Personal Data</h3>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
          </p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-2 list-disc pl-5">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Usage Data</li>
          </ul>
        </div>

        <!-- Usage Data -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Usage Data</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            Usage Data is collected automatically when using the Service.
          </p>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            Usage Data may include information such as Your Device's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
          </p>
          <p class="dark:text-gray-300 text-gray-600">
            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers, and other diagnostic data.
          </p>
        </div>

        <!-- Information from Third-Party Social Media Services -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Information from Third-Party Social Media Services</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services, such as Google.
          </p>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            If You decide to register through or otherwise grant us access to a Third-party Social Media Service, We may collect Personal Data that is already associated with Your Third-party Social Media Service's account, such as Your name, Your email address, Your activities, or Your contact list associated with that account.
          </p>
          <p class="dark:text-gray-300 text-gray-600">
            You may also have the option of sharing additional information with the Company through Your Third-party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.
          </p>
        </div>

        <!-- Use of Your Personal Data -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Use of Your Personal Data</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            The Company may use Personal Data for the following purposes:
          </p>
          <ul class="dark:text-gray-300 text-gray-600 space-y-2 list-disc pl-5">
            <li>To provide and maintain our Service</li>
            <li>To manage Your Account as a registered user</li>
            <li>For the performance of a contract</li>
            <li>To contact You with updates, offers, or communications</li>
            <li>To manage Your requests</li>
            <li>For business transfers or legal purposes</li>
          </ul>
        </div>

        <!-- Retention and Transfer of Your Personal Data -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Retention and Transfer of Your Personal Data</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            We will retain Your Personal Data only as necessary to comply with legal obligations, resolve disputes, and enforce legal agreements.
          </p>
          <p class="dark:text-gray-300 text-gray-600">
            Your information may be transferred and maintained outside of Your state or country. We will take all steps to ensure the security of Your data.
          </p>
        </div>

        <!-- Children's Privacy -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Children's Privacy</h2>
          <p class="dark:text-gray-300 text-gray-600">
            Our Service does not address anyone under the age of 13.
          </p>
        </div>

        <!-- Changes to this Privacy Policy -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Changes to this Privacy Policy</h2>
          <p class="dark:text-gray-300 text-gray-600">
            We may update this Privacy Policy periodically. Changes are effective when posted on this page.
          </p>
        </div>

        <!-- Tracking Technologies and Cookies -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Tracking Technologies and Cookies</h2>
          <p class="dark:text-gray-300 text-gray-600 mb-4">
            We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used include beacons, tags, and scripts to collect and track information and improve and analyze Our Service.
          </p>
          <p class="dark:text-gray-300 text-gray-600">
            For more information, visit the Cookies Policy on our Website.
          </p>
        </div>

        <!-- Company Information -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Company Information</h2>
          <p class="dark:text-gray-300 text-gray-600">
            Website refers to JustBookMe, accessible from www.justbookme.com.
          </p>
        </div>

        <!-- Security of Your Personal Data -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Security of Your Personal Data</h2>
          <p class="dark:text-gray-300 text-gray-600">
            The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
          </p>
        </div>

        <!-- Delete Your Personal Data -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Delete Your Personal Data</h2>
          <p class="dark:text-gray-300 text-gray-600">
            You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. You may delete Your information at any time by logging into Your account and using the data deletion features, or You may contact Us to request deletion of Your data.
          </p>
        </div>

        <!-- Contact Us -->
        <div class="dark:bg-zinc-900 bg-white p-4 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-8">
          <h2 class="text-2xl sm:text-3xl font-semibold dark:text-white text-black text-center mb-4 sm:mb-6">Contact Us</h2>
          <p class="dark:text-gray-300 text-gray-600">
            If you have any questions about this Privacy Policy, You can contact us by visiting contact us page.
          </p>
        </div>

        <!-- Other Sections -->
        <!-- Add similar blocks for all the remaining sections exactly as written in the full text. -->
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

.p-8 {
  padding: 2rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Add these new mobile-optimized styles */
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
