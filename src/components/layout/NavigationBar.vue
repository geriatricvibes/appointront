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
        <RouterLink 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          :class="{ 'bg-accent text-accent-foreground': isCurrentRoute(item.path) }"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.name }}</span>
        </RouterLink>
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
            <DropdownMenuItem asChild>
              <RouterLink to="/profile" class="flex items-center">
                <User class="h-4 w-4 mr-2" />
                Profile
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <RouterLink to="/settings" class="flex items-center">
                <Settings class="h-4 w-4 mr-2" />
                Settings
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
      <RouterLink 
        v-for="item in navigationItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        :class="{ 'bg-accent text-accent-foreground': isCurrentRoute(item.path) }"
        @click="isMobileMenuOpen = false"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { User, Settings, LogOut, LayoutDashboard, HelpCircle, ChevronsUpDown, Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { user, signOut } = useAuth()

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Tutorials', path: '/tutorial', icon: HelpCircle }
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
</script>
