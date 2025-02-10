<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { dashboardApi } from '@/api/dashboard'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import ChatWidget from '@/components/widget/ChatWidget.vue'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline/index.js'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const { user } = useAuth()
const isLoading = ref(false)
const error = ref<string | null>(null)
const calendlyStatus = ref<{ is_connected: boolean; needs_refresh?: boolean; message: string } | null>(null)

// Sources management
const sources = ref<Array<{ id: string; title: string; url?: string; created_at: string }>>([])
const isLoadingSources = ref(false)
const sourceError = ref<string | null>(null)

// New source form
const showAddSourceDialog = ref(false)
const sourceType = ref<'website' | 'note'>('website')
const newSource = ref({
  title: '',
  url: '',
  content: ''
})

const calendlyAuthUrl = computed(() => {
  const clientId = import.meta.env.VITE_CALENDLY_CLIENT_ID
  const redirectUri = `${window.location.origin}/auth/calendly/callback`
  return `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
})

const checkCalendlyStatus = async () => {
  try {
    isLoading.value = true
    error.value = null
    calendlyStatus.value = await dashboardApi.getCalendlyStatus()
  } catch (err) {
    error.value = 'Failed to check Calendly connection status'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const connectCalendly = () => {
  window.location.href = calendlyAuthUrl.value
}

const loadSources = async () => {
  try {
    isLoadingSources.value = true
    sourceError.value = null
    sources.value = await dashboardApi.getSources()
  } catch (err) {
    sourceError.value = 'Failed to load sources'
    console.error(err)
  } finally {
    isLoadingSources.value = false
  }
}

const addSource = async () => {
  try {
    isLoadingSources.value = true
    sourceError.value = null
    await dashboardApi.addSource(newSource.value)
    showAddSourceDialog.value = false
    newSource.value = { title: '', url: '', content: '' }
    await loadSources()
  } catch (err) {
    sourceError.value = 'Failed to add source'
    console.error(err)
  } finally {
    isLoadingSources.value = false
  }
}

const deleteSource = async (sourceId: string) => {
  if (!confirm('Are you sure you want to delete this source?')) return
  
  try {
    isLoadingSources.value = true
    sourceError.value = null
    await dashboardApi.deleteSource(sourceId)
    await loadSources()
  } catch (err) {
    sourceError.value = 'Failed to delete source'
    console.error(err)
  } finally {
    isLoadingSources.value = false
  }
}

onMounted(() => {
  checkCalendlyStatus()
  loadSources()
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
          <h3 class="text-lg font-semibold mb-4">Connect Your Calendar</h3>
          
          <div v-if="isLoading" class="text-center py-4">
            Processing...
          </div>
          
          <div v-else-if="error" class="text-destructive p-4 rounded-md bg-destructive/10">
            {{ error }}
          </div>

          <div v-else-if="calendlyStatus?.is_connected" class="text-success mb-4">
            {{ calendlyStatus.message }}
            <p v-if="calendlyStatus.needs_refresh" class="text-warning mt-2">
              Your connection needs to be refreshed
            </p>
          </div>
          
          <button
            v-if="!calendlyStatus?.is_connected || calendlyStatus?.needs_refresh"
            @click="connectCalendly"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{ calendlyStatus?.is_connected ? 'Reconnect' : 'Connect' }} with Calendly
          </button>
        </div>

        <div class="rounded-lg bg-card p-6 shadow mt-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Knowledge Sources</h3>
            <button
              @click="showAddSourceDialog = true"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
            >
              <PlusIcon class="h-4 w-4 mr-1" />
              Add Source
            </button>
          </div>

          <div v-if="isLoadingSources" class="text-center py-4">
            Loading sources...
          </div>

          <div v-else-if="sourceError" class="text-destructive p-4 rounded-md bg-destructive/10">
            {{ sourceError }}
          </div>

          <div v-else-if="sources.length === 0" class="text-center py-4 text-muted-foreground">
            No sources added yet
          </div>

          <div v-else class="space-y-3">
            <div v-for="source in sources" :key="source.id" 
                 class="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <div>
                <h4 class="font-medium">{{ source.title }}</h4>
                <p v-if="source.url" class="text-sm text-muted-foreground">{{ source.url }}</p>
              </div>
              <button @click="deleteSource(source.id)" 
                      class="text-destructive hover:text-destructive/80">
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>

    <Dialog :open="showAddSourceDialog" @update:open="showAddSourceDialog = false">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Knowledge Source</DialogTitle>
        </DialogHeader>
        
        <form @submit.prevent="addSource" class="space-y-4">
          <div class="flex space-x-4 mb-4">
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="sourceType"
                value="website"
                class="mr-2"
              />
              Website
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                v-model="sourceType"
                value="note"
                class="mr-2"
              />
              Note
            </label>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input
              v-model="newSource.title"
              type="text"
              required
              class="w-full rounded-md border-input"
            />
          </div>
          
          <div v-if="sourceType === 'website'">
            <label class="block text-sm font-medium mb-1">URL</label>
            <input
              v-model="newSource.url"
              type="url"
              required
              class="w-full rounded-md border-input"
            />
          </div>
          
          <div v-if="sourceType === 'note'">
            <label class="block text-sm font-medium mb-1">Content</label>
            <textarea
              v-model="newSource.content"
              rows="4"
              required
              class="w-full rounded-md border-input"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showAddSourceDialog = false"
              class="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              :disabled="isLoadingSources"
            >
              Add Source
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <ChatWidget />
  </div>
</template> 