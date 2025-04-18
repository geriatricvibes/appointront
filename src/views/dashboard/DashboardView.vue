<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { dashboardApi } from '@/api/dashboard'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { PlusIcon, TrashIcon} from '@heroicons/vue/24/outline/index.js'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, BookOpen, FileText, Type, Link2, FileEdit, CheckCircle2, XCircle, Copy, CheckCheck, Key, AlertTriangle } from 'lucide-vue-next'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { chatApi } from '@/api/chat'
import { subscriptionApi } from '@/api/subscription'
import { Button } from '@/components/ui/button'
import { TutorialOverlay } from '@/components/ui/tutorial'
// @ts-ignore
import { useToast } from '@/components/ui/toast/use-toast'
// @ts-ignore 
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const { user } = useAuth()
const { toast } = useToast()
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

const apiKey = ref<string>('')
const copied = ref(false)
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const isLoadingApiKey = ref(true)
const isLoadingSubscription = ref(true)
const hasSubscription = ref(false)

const calendlyAuthUrl = computed(() => {
  const clientId = import.meta.env.VITE_CALENDLY_CLIENT_ID
  const redirectUri = `${window.location.origin}/auth/calendly/callback`
  return `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
})

const widgetCode = computed(() => `<!-- Add Chat Widget CSS -->
<link rel="stylesheet" href="https://unpkg.com/@justbookme.ai/chat-widget/dist/chat-widget.css">

<!-- Chat Widget Container -->
<div id="chat-widget"></div>

<!-- Load Vue first -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>

<!-- Add Chat Widget Script -->
<script src="https://unpkg.com/@justbookme.ai/chat-widget/dist/chat-widget.umd.js"><\/script>
<script>
  window.addEventListener('load', function() {
    if (window.ChatWidget && typeof window.ChatWidget.initChatWidget === 'function') {
      window.ChatWidget.initChatWidget({
        apiKey: "${apiKey.value}",
        apiUrl: "${baseUrl}"
      });
    } else {
      console.error('Chat widget failed to load properly');
    }
  });
<\/script>`)

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

const loadApiKey = async () => {
  try {
    isLoadingApiKey.value = true
    apiKey.value = await chatApi.getApiKey()
  } catch (err) {
    console.error('Failed to load API key', err)
  } finally {
    isLoadingApiKey.value = false
  }
}

const checkSubscriptionStatus = async () => {
  try {
    isLoadingSubscription.value = true
    const response = await subscriptionApi.getSubscriptionStatus()
    hasSubscription.value = response.has_subscription
  } catch (error) {
    console.error('Failed to fetch subscription status:', error)
    hasSubscription.value = false 
  } finally {
    isLoadingSubscription.value = false
  }
}

const handleSignUp = async () => {
  try {
    isLoadingSubscription.value = true
    const response = await subscriptionApi.createSubscription()
    window.location.href = response.payment_link
  } catch (error) {
    console.error('Failed to initiate subscription:', error)
    toast({
      title: 'Error',
      description: 'Failed to start the sign-up process. Please try again.',
      variant: 'destructive'
    })
  }
}

const copyWidgetCode = async () => {
  const code = `<!-- Add Chat Widget CSS -->
<link rel="stylesheet" href="https://unpkg.com/@justbookme.ai/chat-widget/dist/chat-widget.css">

<!-- Chat Widget Container -->
<div id="chat-widget"></div>

<!-- Load Vue first -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>

<!-- Add Chat Widget Script -->
<script src="https://unpkg.com/@justbookme.ai/chat-widget/dist/chat-widget.umd.js"><\/script>
<script>
  window.addEventListener('load', function() {
    if (window.ChatWidget && typeof window.ChatWidget.initChatWidget === 'function') {
      window.ChatWidget.initChatWidget({
        apiKey: "${apiKey.value}",
        apiUrl: "${baseUrl}"
      });
    } else {
      console.error('Chat widget failed to load properly');
    }
  });
<\/script>`

  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

onMounted(() => {
  checkCalendlyStatus()
  loadSources()
  loadApiKey()
  checkSubscriptionStatus()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <NavigationBar />
    
    <main class="flex-1 p-3 md:p-8 max-w-7xl mx-auto w-full">
      <div v-if="user" class="space-y-4">
        <div class="space-y-4">
          <!-- Calendly Card -->
          <div class="rounded-lg bg-card p-3 md:p-4 shadow-sm border border-border/50" data-tutorial="calendly-connection">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <img src="@/assets/calendly.png" alt="Calendly" class="h-5 w-5" />
                <h3 class="font-medium text-sm md:text-base">Calendly Connection</h3>
              </div>
              
              <div v-if="isLoading" class="px-3 py-1.5">
                <Loader2 class="h-4 w-4 text-muted-foreground animate-spin" />
              </div>
              
              <!-- Not Connected State -->
              <button
                v-else-if="!calendlyStatus?.is_connected"
                @click="connectCalendly"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <XCircle class="h-4 w-4" />
                Connect
              </button>

              <!-- Needs Refresh State -->
              <button
                v-else-if="calendlyStatus?.needs_refresh"
                @click="connectCalendly"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                <AlertTriangle class="h-4 w-4" />
                Reconnect
              </button>
              
              <!-- Connected State -->
              <div v-else class="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md">
                <CheckCircle2 class="h-4 w-4" />
                <span class="text-sm font-medium">Connected</span>
              </div>
            </div>
            
            <p v-if="error && !isLoading" class="mt-2 text-sm text-destructive flex items-center gap-1.5">
              <XCircle class="h-4 w-4" />
              {{ error }}
            </p>
          </div>

          <!-- Knowledge Sources Card -->
          <div class="rounded-lg bg-card p-3 md:p-4 shadow-sm border border-border/50" data-tutorial="knowledge-sources">
            <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div class="flex items-center gap-2 flex-grow">
                <BookOpen class="h-5 w-5 text-primary" />
                <h3 class="font-medium text-sm md:text-base">Website URL/Business Notes</h3>
              </div>
              <button
                @click="showAddSourceDialog = true"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-colors flex-shrink-0"
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

            <div v-else class="space-y-2 max-h-[300px] overflow-y-auto pr-1 md:pr-2">
              <div v-for="source in sources" :key="source.id" 
                   class="flex justify-between items-center p-3 md:p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors group">
                <div class="flex items-center gap-2 md:gap-3 min-w-0">
                  <div class="flex-shrink-0">
                    <Link2 v-if="source.url" class="h-5 w-5 text-primary" />
                    <FileText v-else class="h-5 w-5 text-primary" />
                  </div>
                  <div class="min-w-0">
                    <h4 class="font-medium text-foreground text-sm md:text-base truncate">{{ source.title }}</h4>
                    <p v-if="source.url" class="text-xs md:text-sm text-muted-foreground truncate max-w-full">
                      {{ source.url }}
                    </p>
                    <p v-else class="text-xs md:text-sm text-muted-foreground">Custom note</p>
                  </div>
                </div>
                <button @click="deleteSource(source.id)" 
                        class="flex-shrink-0 opacity-100 md:opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity p-1 hover:bg-destructive/10 rounded-md">
                  <TrashIcon class="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Widget Integration Card -->
          <div class="rounded-lg border bg-card p-4 md:p-6" data-tutorial="widget-integration">
            <div class="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
              <div>
                <h3 class="text-base md:text-lg font-semibold">Widget Integration</h3>
                <p class="text-xs md:text-sm text-muted-foreground mt-1">
                  Add the chat widget to your website with this code snippet
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                @click="copyWidgetCode"
                :disabled="isLoadingApiKey"
                class="min-w-[100px]"
              >
                <template v-if="isLoadingApiKey">
                  <Loader2 class="h-4 w-4 animate-spin" />
                </template>
                <template v-else-if="copied">
                  <CheckCheck class="h-4 w-4 mr-2" />
                  Copied!
                </template>
                <template v-else>
                  <Copy class="h-4 w-4 mr-2" />
                  Copy
                </template>
              </Button>
            </div>

            <div class="relative">
              <div 
                v-if="isLoadingApiKey" 
                class="absolute inset-0 bg-card/50 backdrop-blur-sm flex items-center justify-center rounded-md"
              >
                <div class="flex flex-col items-center gap-2">
                  <Loader2 class="h-6 w-6 animate-spin text-primary" />
                  <span class="text-sm text-muted-foreground">Loading configuration...</span>
                </div>
              </div>
              
              <div class="relative rounded-md border bg-muted/50">
                <!-- Code sections -->
                <div class="flex items-center justify-between px-4 py-2 border-b">
                  <div class="flex items-center gap-2">
                    <code class="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                      HTML
                    </code>
                    <span class="text-sm text-muted-foreground">Widget Integration Code</span>
                  </div>
                </div>
                
                <pre class="p-4 overflow-x-auto text-sm"><code>{{ widgetCode }}</code></pre>
                
                <!-- Installation steps -->
                <div class="border-t px-4 py-3 bg-muted/30">
                  <h4 class="text-sm font-medium mb-2">Quick Installation Steps:</h4>
                  <ol class="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Copy the code snippet above</li>
                    <li>Paste it before the closing <code class="text-xs bg-muted-foreground/20 px-1 rounded">&lt;/body&gt;</code> tag in your HTML</li>
                    <li>The chat widget will appear automatically on your website</li>
                  </ol>
                </div>

                <!-- Subscription Warning -->
                <Alert 
                  v-if="!isLoadingSubscription && !hasSubscription"
                  variant="warning"
                  class="mt-4 border-orange-400 bg-orange-50 dark:bg-orange-950 dark:border-orange-600"
                >
                  <AlertTriangle class="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  <AlertTitle class="text-orange-700 dark:text-orange-300">Subscription Required for Scheduling</AlertTitle>
                  <AlertDescription class="text-orange-600 dark:text-orange-400">
                    The AI scheduling features will not function without an active subscription.
                    <Button 
                      variant="link"
                      class="p-0 h-auto font-semibold text-orange-700 dark:text-orange-300 hover:underline ml-1"
                      @click="handleSignUp"
                      :disabled="isLoadingSubscription"
                    >
                      Sign up now for a free 14-day trial (cancel anytime)
                    </Button>
                  </AlertDescription>
                </Alert>
                <div v-if="isLoadingSubscription" class="mt-4 flex items-center justify-center text-muted-foreground text-sm">
                  <Loader2 class="h-4 w-4 animate-spin mr-2" />
                  Checking subscription status...
                </div>
              </div>
            </div>

            <!-- API Key info -->
            <div class="mt-4 p-3 rounded-md bg-muted/30 flex items-center gap-3">
              <div class="p-2 rounded-full bg-primary/10">
                <Key class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">Your API Key</p>
                <p class="text-xs text-muted-foreground mt-0.5">
                  This key is automatically included in the code snippet above
                </p>
              </div>
              <code class="text-xs bg-muted px-2 py-1 rounded">
                {{ isLoadingApiKey ? '••••••••' : (apiKey || '').substring(0, 8) + '...' }}
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Tutorial Overlay -->
    <TutorialOverlay />

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
            <label class="text-sm font-medium mb-1 flex items-center gap-2">
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
            <label class="text-sm font-medium mb-1 flex items-center gap-2">
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
            <label class="text-sm font-medium mb-1 flex items-center gap-2">
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
  </div>
</template> 