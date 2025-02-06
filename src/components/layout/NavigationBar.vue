<template>
  <div class="border-b w-full">
    <nav class="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <!-- Logo/Brand -->
      <RouterLink to="/" class="flex items-center space-x-2">
       
        <span class="font-bold text-xl">JustBookMe</span>
      </RouterLink>

      <!-- Main Navigation - Horizontal layout -->
      <div class="flex items-center space-x-4">
        <RouterLink 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </div>

      <!-- User Profile Section -->
      <div>
        <DropdownMenu v-if="user">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" class="flex items-center space-x-2">
              <Avatar class="h-8 w-8">
                <AvatarImage :src="user.user_metadata?.avatar_url || ''" />
                <AvatarFallback>
                  {{ user.email?.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col items-start">
                <span class="text-sm font-medium">
                  {{ user.user_metadata?.full_name || 'User' }}
                </span>
                <span class="text-xs text-muted-foreground">
                  {{ user.email }}
                </span>
              </div>
              <ChevronsUpDown class="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuItem>
              <User class="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings class="h-4 w-4 mr-2" />
              Settings
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
  </div>
</template>

<script setup lang="ts">
import { User, Settings, LogOut, LayoutDashboard, Users, Calendar, HelpCircle, ChevronsUpDown } from 'lucide-vue-next'
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
import { useRouter } from 'vue-router'

const router = useRouter()
const { user, signOut } = useAuth()

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Help', path: '/help', icon: HelpCircle }
]

const handleSignOut = async () => {
  await signOut()
  router.push('/auth')
}
</script>
