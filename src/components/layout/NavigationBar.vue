<template>
  <header class="w-full bg-background">
    <nav class="flex h-16 items-center px-4 max-w-7xl mx-auto">
      <!-- Logo/Brand -->
      <RouterLink to="/" class="flex items-center gap-2 flex-1">
        <img 
          src="/justbookmelogo.png" 
          alt="JustBookMe Logo" 
          class="h-5 w-5 dark:invert"
        />
        <span class="font-semibold text-xl">JustBookMe</span>
      </RouterLink>

      <!-- Main Navigation - Desktop -->
      <div class="hidden md:flex items-center gap-2 flex-1 justify-center">
        <a 
          v-for="item in navigationItems" 
          :key="item.name"
          href="#"
          @click.prevent="handleNavItemClick(item)"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          :class="{ 'bg-accent text-accent-foreground': !item.action && isCurrentRoute(item.path) }"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.name }}</span>
        </a>
      </div>

      <!-- User Profile Section -->
      <div class="flex items-center flex-1 justify-end">
        <!-- Mobile Menu Button -->
        <Button variant="ghost" size="icon" class="md:hidden mr-2" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </Button>

        <DropdownMenu v-if="user">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" class="flex items-center gap-2">
              <Avatar class="h-8 w-8">
                <AvatarImage :src="user.user_metadata?.avatar_url" alt="User avatar" />
                <AvatarFallback>
                  {{ getUserInitial }}
                </AvatarFallback>
              </Avatar>
              <div class="hidden sm:flex flex-col items-start">
                <span class="text-sm font-medium line-clamp-1">
                  {{ getUserDisplayName }}
                </span>
                <span class="text-xs text-muted-foreground line-clamp-1">
                  {{ user.email }}
                </span>
              </div>
              <ChevronsUpDown class="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuItem v-if="!hasSubscription" @click="handleGetPro" :disabled="isLoading" class="flex-col items-start p-3">
              <div class="flex items-center">
                <CircleDollarSign class="h-4 w-4 mr-2 flex-shrink-0" />
                <span class="font-medium">Get Pro</span>
                <Loader2 v-if="isLoading" class="h-4 w-4 ml-auto animate-spin" />
              </div>
              <p class="text-xs text-muted-foreground pl-6">14 days free trial - cancel anytime</p>
            </DropdownMenuItem>
            <DropdownMenuItem v-if="hasSubscription" class="flex-col items-start p-3">
              <div class="flex items-center">
                <Badge class="mr-2 bg-emerald-500">Pro</Badge>
                <span>Active Subscription</span>
              </div>
              <span v-if="subscriptionDetails?.current_period_end" class="text-xs text-muted-foreground mt-1">
                Expires: {{ formatDate(subscriptionDetails.current_period_end) }}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem v-if="hasSubscription" @click="handleManageSubscription" :disabled="isLoading">
              <Settings class="h-4 w-4 mr-2" />
              <span>Manage Subscription</span>
              <Loader2 v-if="isLoading" class="h-4 w-4 ml-auto animate-spin" />
            </DropdownMenuItem>
            <DropdownMenuSeparator v-if="hasSubscription" />
            <DropdownMenuItem @click="handleSignOut">
              <LogOut class="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden px-4 py-2 bg-background border-t">
      <a 
        v-for="item in navigationItems" 
        :key="item.name"
        href="#"
        @click.prevent="handleNavItemClick(item)"
        class="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
        :class="{ 'bg-accent text-accent-foreground': !item.action && isCurrentRoute(item.path) }"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { LogOut, LayoutDashboard, HelpCircle, ChevronsUpDown, Menu, X, User, CircleDollarSign, Settings, Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { useTutorial } from '@/composables/useTutorial'
import { subscriptionApi } from '@/api/subscription'
// @ts-ignore
import { useToast } from '@/components/ui/toast/use-toast'

// Define types for subscription details
interface SubscriptionDetails {
  id: string;
  dodo_subscription_id: string;
  status: string;
  current_period_start?: string;
  current_period_end?: string;
  amount?: number;
  currency?: string;
  created_at: string;
  is_cancelled_but_active: boolean;
  has_unlimited_access: boolean;
}

// Define navigation item type
interface NavigationItem {
  name: string;
  path: string;
  icon: any;
  action?: () => void;
}

const router = useRouter()
const route = useRoute()
const { user, signOut } = useAuth()
const { startTutorial } = useTutorial()
const { toast } = useToast()
const isLoading = ref(false)
const hasSubscription = ref(false)
const subscriptionDetails = ref<SubscriptionDetails | undefined>(undefined)

// Load subscription status on component mount
onMounted(async () => {
  await fetchSubscriptionStatus()
})

async function fetchSubscriptionStatus() {
  try {
    const response = await subscriptionApi.getSubscriptionStatus()
    hasSubscription.value = response.has_subscription
    subscriptionDetails.value = response.subscription
  } catch (error) {
    console.error('Error fetching subscription status:', error)
  }
}

// Format date helper
function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Define a direct function to start the tutorial
const handleStartTutorial = () => {
  console.log('Navigation: Starting tutorial')
  startTutorial()
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Tutorials', 
    path: '#', 
    icon: HelpCircle,
    action: handleStartTutorial
  }
]

const getUserInitial = computed(() => 
  user.value?.email?.charAt(0).toUpperCase() || '?'
)

const getUserDisplayName = computed(() => 
  user.value?.user_metadata?.full_name || 'User'
)

const isCurrentRoute = (path: string) => route.path === path

const handleSignOut = async () => {
  await signOut()
  router.push('/auth')
}

const navigateToAccount = () => {
  // router.push('/account') // No longer used
}

const handleGetPro = async () => {
  try {
    isLoading.value = true
    const response = await subscriptionApi.createSubscription()
    window.location.href = response.payment_link
  } catch (error) {
    console.error('Failed to create subscription:', error)
    toast({
      title: 'Error',
      description: 'Failed to generate payment link. Please try again.',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
}

const handleManageSubscription = async () => {
  try {
    isLoading.value = true
    const response = await subscriptionApi.cancelSubscription()
    // Open the portal link in a new tab
    window.open(response.portal_link, '_blank')
  } catch (error) {
    console.error('Failed to access subscription portal:', error)
    toast({
      title: 'Error',
      description: 'Failed to access subscription management portal. Please try again.',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
}

const isMobileMenuOpen = ref(false)

// Handle navigation item click
const handleNavItemClick = (item: NavigationItem) => {
  console.log('Navigation item clicked:', item.name)
  if (item.action) {
    item.action()
  } else if (item.path) {
    router.push(item.path)
  }
  isMobileMenuOpen.value = false
}
</script>
