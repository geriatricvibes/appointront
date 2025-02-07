<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { dashboardApi } from '@/api/dashboard'

interface TimeSlot {
  start_time: string
  end_time: string
  is_available: boolean
}

const { user } = useAuth()
const availableSlots = ref<TimeSlot[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchAvailableSlots = async () => {
  console.log('Fetching available slots...')
  console.log('Current user:', user.value)
  
  isLoading.value = true
  error.value = null
  
  try {
    // Get slots for the next 7 days
    const startDate = new Date().toISOString()
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    
    console.log('Requesting slots with dates:', { startDate, endDate })
    
    availableSlots.value = await dashboardApi.getAvailableSlots({
      start_date: startDate,
      end_date: endDate,
      duration_minutes: 30
    })
    
    console.log('Received slots:', availableSlots.value)
  } catch (err) {
    console.error('Error details:', err)
    error.value = 'Failed to load available slots'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (user.value) {
    fetchAvailableSlots()
  }
})

// Simplified watcher
watch(user, (newUser) => {
  if (newUser) {
    fetchAvailableSlots()
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavigationBar />
    
    <main class="flex-1 p-8 max-w-7xl mx-auto w-full">
      <div v-if="user" class="space-y-6">
        <div class="rounded-lg bg-card p-6 shadow">
          <h2 class="mb-2 font-semibold">Welcome, {{ user.email }}</h2>
          <p class="text-muted-foreground">You're successfully logged in!</p>
        </div>

        <div class="rounded-lg bg-card p-6 shadow">
          <h3 class="text-lg font-semibold mb-4">Available Appointment Slots</h3>
          
          <div v-if="isLoading" class="text-center py-4">
            Loading available slots...
          </div>
          
          <div v-else-if="error" class="text-destructive p-4 rounded-md bg-destructive/10">
            {{ error }}
          </div>
          
          <div v-else-if="availableSlots.length === 0" class="text-muted-foreground">
            No available slots found.
          </div>
          
          <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="slot in availableSlots"
              :key="slot.start_time"
              class="p-4 rounded-md border bg-card hover:bg-accent transition-colors cursor-pointer"
            >
              <div class="font-medium">
                {{ new Date(slot.start_time).toLocaleTimeString() }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ new Date(slot.start_time).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template> 