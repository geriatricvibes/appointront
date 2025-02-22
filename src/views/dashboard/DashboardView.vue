<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { dashboardApi } from '@/api/dashboard'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import ChatWidget from '@/components/widget/ChatWidget.vue'
import { PlusIcon, TrashIcon, CalendarIcon } from '@heroicons/vue/24/outline/index.js'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, BookOpen, FileText, Type, Link2, FileEdit, CheckCircle2, XCircle } from 'lucide-vue-next'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

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
const sourceType = ref(true)
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
  <div class="min-h-screen flex flex-col bg-background">
    <NavigationBar />
    
    <main class="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div v-if="user" class="space-y-6">
        <div class="space-y-4">
          <!-- Calendly Card -->
          <div class="rounded-lg bg-card p-4 shadow-sm border border-border/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img src="@/assets/calendly.png" alt="Calendly" class="h-5 w-5" />
                <h3 class="font-medium">Calendly Connection</h3>
              </div>
              
              <div v-if="isLoading">
                <Loader2 class="h-4 w-4 text-primary animate-spin" />
              </div>
              
              <button
                v-else-if="!calendlyStatus?.is_connected || calendlyStatus?.needs_refresh"
                @click="connectCalendly"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                {{ calendlyStatus?.is_connected ? 'Reconnect' : 'Connect' }}
              </button>
              
              <div v-else class="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-md">
                <CheckCircle2 class="h-4 w-4" />
                <span class="text-sm font-medium">Connected</span>
              </div>
            </div>
            
            <p v-if="error" class="mt-2 text-sm text-destructive flex items-center gap-2">
              <XCircle class="h-4 w-4" />
              {{ error }}
            </p>
            <p v-else-if="calendlyStatus?.needs_refresh" class="mt-2 text-sm text-warning flex items-center gap-2">
              <XCircle class="h-4 w-4" />
              Connection needs refresh
            </p>
          </div>

          <!-- Knowledge Sources Card -->
          <div class="rounded-lg bg-card p-4 shadow-sm border border-border/50">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <BookOpen class="h-5 w-5 text-primary" />
                <h3 class="font-medium">Knowledge Sources</h3>
              </div>
              <button
                @click="showAddSourceDialog = true"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <PlusIcon class="h-4 w-4 mr-1" />
                Add Source
              </button>
            </div>

            <div v-if="isLoadingSources" class="flex items-center justify-center py-4">
              <Loader2 class="h-4 w-4 text-primary animate-spin" />
            </div>

            <div v-else-if="sourceError" class="text-sm text-destructive p-3 rounded-md bg-destructive/10">
              {{ sourceError }}
            </div>

            <div v-else-if="sources.length === 0" class="text-center py-6">
              <FileText class="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              <p class="text-sm text-muted-foreground">No sources added yet</p>
            </div>

            <div v-else class="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              <div v-for="source in sources" :key="source.id" 
                   class="flex justify-between items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group">
                <div>
                  <h4 class="font-medium">{{ source.title }}</h4>
                  <p v-if="source.url" class="text-sm text-muted-foreground truncate max-w-[250px]">
                    {{ source.url }}
                  </p>
                </div>
                <button @click="deleteSource(source.id)" 
                        class="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity">
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
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
          <div class="space-y-2">
            <div class="flex items-center space-x-4 px-2">
              <div class="flex items-center space-x-2">
                <Label>Note</Label>
                <Switch
                  v-model="sourceType"
                  class="mx-2"
                />
                <Label>Website</Label>
              </div>
            </div>
            <div class="bg-muted/30 rounded-md p-3">
              <p class="text-sm text-muted-foreground">
                {{ sourceType 
                  ? 'Add a website URL to extract content from external sources' 
                  : 'Create a note to add your own custom content directly' 
                }}
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 flex items-center gap-2">
              <Type class="h-4 w-4" />
              Title
            </label>
            <input
              v-model="newSource.title"
              type="text"
              required
              class="w-full rounded-md border px-3 py-2 bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <div v-if="sourceType">
            <label class="block text-sm font-medium mb-1 flex items-center gap-2">
              <Link2 class="h-4 w-4" />
              URL
            </label>
            <input
              v-model="newSource.url"
              type="url"
              required
              class="w-full rounded-md border px-3 py-2 bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <div v-else>
            <label class="block text-sm font-medium mb-1 flex items-center gap-2">
              <FileEdit class="h-4 w-4" />
              Content
            </label>
            <textarea
              v-model="newSource.content"
              rows="4"
              required
              class="w-full rounded-md border px-3 py-2 bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 inline-flex items-center gap-2"
              :disabled="isLoadingSources"
            >
              <Loader2 
                v-if="isLoadingSources" 
                class="h-4 w-4 animate-spin" 
              />
              {{ isLoadingSources ? 'Adding...' : 'Add Source' }}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <ChatWidget />
  </div>
</template> 