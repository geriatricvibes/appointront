import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import AuthView from '@/views/auth/AuthView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import AuthCallback from '@/views/auth/AuthCallBack.vue'
import CalendlyCallback from '@/views/auth/CalendlyCallback.vue'
import AboutView from '@/views/aboutus/About.vue'
import PricingView from '@/views/pricing/Pricing.vue'
import PrivacyView from '@/views/privacy/Privacy.vue'
import TOSView from '@/views/terms/TOS.vue'
import RefundView from '@/views/refund/Refund.vue'
import ContactView from '@/views/contact/Contact.vue'

// Get the current hostname
const hostname = window.location.hostname

// Determine if we're on the app subdomain
const isAppSubdomain = hostname.startsWith('app.') || 
                       hostname === 'localhost' || 
                       hostname.includes('127.0.0.1')

// Create routes based on domain
const routes = [
  // Routes available on the app subdomain
  ...(isAppSubdomain ? [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: AuthCallback
    },
    {
      path: '/auth/calendly/callback',
      name: 'calendly-callback',
      component: CalendlyCallback
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    }
  ] : [
    // Routes available on the main/landing domain
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingView
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: PrivacyView
    },
    {
      path: '/terms-of-use',
      name: 'terms',
      component: TOSView
    },
    {
      path: '/refund',
      name: 'refund',
      component: RefundView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ])
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 