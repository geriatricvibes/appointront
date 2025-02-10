<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Menu, Sun, Moon, CreditCard, Users, LogIn } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const isOpen = ref(false)
const isHomePage = computed(() => route.path === '/')

// Theme toggle functionality
const toggleTheme = () => {
  const root = document.documentElement
  const isDark = root.classList.contains('dark')
  const newTheme = isDark ? 'light' : 'dark'
  
  root.classList.remove('dark', 'light')
  root.classList.add(newTheme)
  
  localStorage.setItem('theme', newTheme)
}

const isDarkTheme = computed(() => {
  return document.documentElement.classList.contains('dark')
})

const mobileMenuOpen = ref(false)

const closeMenu = () => {
  mobileMenuOpen.value = false
}

// Update navigation items with new icons
const navigationItems = [
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'About', href: '/about', icon: Users },
]

const lastScrollPosition = ref(0)
const isVisible = ref(true)

const navigateToLogin = () => {
  router.push('/auth')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY
    
    // Show navbar when scrolling up, hide when scrolling down
    isVisible.value = 
      currentScrollPosition < lastScrollPosition.value || 
      currentScrollPosition < 50
    
    lastScrollPosition.value = currentScrollPosition
  })
})
</script>

<template>
  <Transition name="navbar">
    <header 
      v-show="isVisible"
      class="fixed top-0 z-50 w-full transition-all duration-300"
    >
      <div class="container flex h-16 items-center">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="mr-auto flex items-center space-x-2"
        >
          <img 
            src="@/assets/logo transaprent copy.png" 
            alt="ApointAI Logo" 
            class="h-8 w-8"
          />
          <span class="text-xl font-bold">
            JustBookMe<span class="text-primary"></span>
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-4 ml-6">
          <!-- Login Button -->
          <Button
            @click="navigateToLogin"
            size="sm"
            class="hidden md:inline-flex"
          >
            Login
          </Button>

          <!-- Theme Toggle -->
          <Button
            variant="ghost"
            size="sm"
            @click="toggleTheme"
            class="h-8 w-8 px-0 relative"
          >
            <Sun 
              v-if="!isDarkTheme" 
              class="h-4 w-4 absolute transition-all rotate-0 scale-100"
            />
            <Moon 
              v-else 
              class="h-4 w-4 absolute transition-all rotate-0 scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <!-- Mobile Menu -->
          <div class="md:hidden relative">
            <Button 
              variant="ghost" 
              size="icon"
              class="hover:bg-transparent focus-visible:bg-transparent active:bg-transparent"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <Menu class="h-6 w-6" />
              <span class="sr-only">Toggle menu</span>
            </Button>

            <!-- Enhanced Popup Menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div 
                v-if="mobileMenuOpen"
                class="absolute right-0 mt-2 w-56 py-2 bg-background/95 backdrop-blur-xl rounded-xl shadow-lg border border-border/40"
              >
                <div class="px-2 space-y-1">
                  <Button
                    v-for="item in navigationItems"
                    :key="item.name"
                    variant="ghost"
                    class="w-full justify-start px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10"
                    :class="{ 'bg-primary/15 text-primary': route.path === item.href }"
                    @click="$router.push(item.href); closeMenu()"
                  >
                    <component 
                      :is="item.icon" 
                      class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" 
                    />
                    {{ item.name }}
                  </Button>

                  <div class="h-px bg-border/50 my-1 mx-2"></div>

                  <Button
                    variant="ghost"
                    class="w-full justify-start px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10"
                    @click="navigateToLogin(); closeMenu()"
                  >
                    <LogIn class="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Login
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>
  </Transition>
</template>

<style scoped>
.router-link-active {
  @apply text-primary;
}

.navbar-enter-active,
.navbar-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.navbar-enter-from,
.navbar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.navbar-enter-to,
.navbar-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Add smooth transitions for mobile menu items */
.sheet-content {
  @apply transition-transform duration-300;
}

button {
  @apply transition-colors duration-200;
}

/* Add these new styles */
:deep(.sheet-content) {
  @apply shadow-none;
}

:deep(.sheet-overlay) {
  @apply bg-background/40 backdrop-blur-sm;
}

/* Add these new styles */
.absolute {
  @apply z-50;
}

/* Add these new styles for enhanced animations */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

button {
  @apply transition-all duration-200 ease-in-out;
}
</style>