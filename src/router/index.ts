import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import AuthCallback from '@/views/auth/AuthCallBack.vue'
import CalendlyCallback from '@/views/auth/CalendlyCallback.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
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
  ]
})

export default router 