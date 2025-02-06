import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'
import HomeView from '@/views/home/HomeView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import AuthCallback from '@/views/auth/AuthCallBack.vue'

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
      beforeEnter: async (_to, _from, next) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: AuthCallback
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: async (_to, _from, next) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          next('/auth')
        } else {
          next()
        }
      }
    }
  ]
})

export default router 