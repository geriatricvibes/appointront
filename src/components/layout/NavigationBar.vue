<template>
  <header class="w-full bg-background">
    <nav class="flex h-16 items-center px-4 max-w-7xl mx-auto">
      <!-- Logo/Brand -->
      <RouterLink to="/" class="flex items-center gap-2 flex-1">
        <img 
          src="/calendar-sync.png" 
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
import { computed, ref } from 'vue'
import { LogOut, LayoutDashboard, HelpCircle, ChevronsUpDown, Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { useTutorial } from '@/composables/useTutorial'

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
