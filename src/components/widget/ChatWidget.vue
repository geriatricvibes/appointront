<script setup lang="ts">
// Add to top of <script setup>
declare const Calendly: any

import { ref, onMounted, watch, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { chatApi } from '@/api/chat'
import { ArrowLeft, Send, Loader2, Calendar, MessageCircle } from 'lucide-vue-next'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  isError?: boolean
  errorType?: 'network' | 'server' | 'unknown' | 'auth'
  book?: boolean
}

interface CalendlyUserInfo {
  scheduling_url: string
  // ... other fields
}

const isOpen = ref(false)
const inputMessage = ref('')
const STORAGE_KEY = 'chat_messages'
const hasApiKey = ref(false)

const messages = ref<Message[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || [{
    id: '1',
    content: 'Hello! How can I help you schedule a meeting today?',
    sender: 'bot',
    timestamp: new Date()
  }]
)
const isLoading = ref(false)
const calendlyUserInfo = ref<CalendlyUserInfo | null>(null)
const showCalendly = ref(false)

// Initialize markdown-it
const md = new MarkdownIt({
  breaks: true,
  linkify: true
})

// Add a ref to store the latest response
const latestResponse = ref<SchedulingMessageResponse | null>(null)

// Add this ref to track the scroll area
const scrollAreaRef = ref<HTMLElement | null>(null)

// Add this function to scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (scrollAreaRef.value?.$el) {
      const scrollContainer = scrollAreaRef.value.$el.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  })
}

// Modify toggleWidget to include scroll behavior
const toggleWidget = () => {
  isOpen.value = !isOpen.value
  // Reset to chat view when closing widget
  if (!isOpen.value) {
    showCalendly.value = false
  } else {
    // Scroll to bottom when opening
    scrollToBottom()
  }
}

// Add initialization of API key
onMounted(async () => {
  try {
    // First try to get API key
    await chatApi.getApiKey()
    hasApiKey.value = true
    
    // Then get Calendly info
    calendlyUserInfo.value = await chatApi.getUserInfo()
  } catch (error) {
    console.error('Failed to initialize chat:', error)
    messages.value.push({
      id: crypto.randomUUID(),
      content: 'Unable to initialize chat. Please try refreshing the page or contact support.',
      sender: 'bot',
      timestamp: new Date(),
      isError: true,
      errorType: 'auth'
    })
  }
})

// Modify sendMessage to check for API key
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  if (!hasApiKey.value) {
    messages.value.push({
      id: crypto.randomUUID(),
      content: 'Chat is not properly initialized. Please refresh the page.',
      sender: 'bot',
      timestamp: new Date(),
      isError: true,
      errorType: 'auth'
    })
    return
  }

  const userMessage: Message = {
    id: crypto.randomUUID(),
    content: inputMessage.value,
    sender: 'user',
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  
  const userInput = inputMessage.value
  inputMessage.value = ''
  isLoading.value = true

  try {
    const response = await chatApi.sendMessage({
      message: userInput,
      days_range: 7,
      chat_history: messages.value,
      is_current_message: true
    })

    // Parse the response if it's a string
    const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response
    
    // Store the parsed response
    latestResponse.value = parsedResponse

    const botMessage: Message = {
      id: crypto.randomUUID(),
      content: parsedResponse.message,
      sender: 'bot',
      timestamp: new Date(),
      book: parsedResponse.book
    }
    messages.value.push(botMessage)

    // If booking is recommended, send a separate message with the scheduling link
    if (parsedResponse.book && calendlyUserInfo.value?.scheduling_url) {
      const schedulingMessage: Message = {
        id: crypto.randomUUID(),
        content: `📅 **Schedule Your Meeting**\n\nClick the button below to schedule a time that works best for you.`,
        sender: 'bot',
        timestamp: new Date(),
        book: true
      }
      messages.value.push(schedulingMessage)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  } catch (error) {
    let errorMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'bot',
      timestamp: new Date(),
      isError: true,
      errorType: 'unknown'
    }

    if (error instanceof Error) {
      // Network error
      if ('message' in error && error.message.includes('Network')) {
        errorMessage.content = 'Unable to connect to the server. Please check your internet connection and try again.'
        errorMessage.errorType = 'network'
      }
      // Server error
      else if ('response' in error && error.response?.status >= 500) {
        errorMessage.content = 'Our server is experiencing issues. Please try again in a few moments.'
        errorMessage.errorType = 'server'
      }
      // Unknown error
      else {
        errorMessage.content = 'Something went wrong. Please try again or contact support if the issue persists.'
        errorMessage.errorType = 'unknown'
      }
    } else {
      errorMessage.content = 'An unexpected error occurred. Please try again.'
    }

    messages.value.push(errorMessage)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
    console.error('Chat error:', error)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// Modify retryLastMessage to handle API key errors
const retryLastMessage = async () => {
  const lastErrorMessage = messages.value[messages.value.length - 1]
  
  if (lastErrorMessage.errorType === 'auth') {
    try {
      await chatApi.getApiKey()
      hasApiKey.value = true
      messages.value = messages.value.slice(0, -1) // Remove error message
      
      // Retry last user message if exists
      const lastUserMessage = [...messages.value].reverse().find(m => m.sender === 'user')
      if (lastUserMessage) {
        inputMessage.value = lastUserMessage.content
        await sendMessage()
      }
    } catch (error) {
      console.error('Failed to reinitialize API key:', error)
    }
  } else {
    // Handle other error types as before
    const lastUserMessage = [...messages.value].reverse().find(m => m.sender === 'user')
    if (lastUserMessage) {
      messages.value = messages.value.slice(0, -1)
      inputMessage.value = lastUserMessage.content
      await sendMessage()
    }
  }
}

// Add this watch to initialize Calendly when modal opens
watch(showCalendly, (newValue) => {
  if (newValue && calendlyUserInfo.value?.scheduling_url) {
    // Wait for DOM to update
    nextTick(() => {
      Calendly.initInlineWidget({
        url: calendlyUserInfo.value.scheduling_url,
        parentElement: document.getElementById('calendly-widget'),
        prefill: {},
        utm: {}
      })
    })
  }
})
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Toggle Button -->
    <Button
      variant="default"
      size="icon"
      class="rounded-full h-12 w-12 shadow-lg"
      @click="toggleWidget"
    >
      <MessageCircle class="h-6 w-6" />
    </Button>

    <!-- Chat Window -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <Card
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-[400px] shadow-xl"
      >
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Button
                v-if="showCalendly"
                variant="secondary"
                size="icon"
                @click="showCalendly = false"
              >
                <ArrowLeft class="h-5 w-5" />
                <span class="sr-only">Back to chat</span>
              </Button>
              <CardTitle class="text-lg font-semibold">
                {{ showCalendly ? 'Schedule Meeting' : 'Chat with us' }}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="!showCalendly">
            <CardContent class="p-0">
              <ScrollArea ref="scrollAreaRef" class="h-[400px]">
                <div class="space-y-4 p-4">
                  <div
                    v-for="message in messages"
                    :key="message.id"
                    :class="[
                      'flex animate-in fade-in slide-in-from-bottom-2 duration-300',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    ]"
                  >
                    <div
                      :class="[
                        'rounded-2xl px-4 py-1.5 max-w-[80%] prose prose-sm dark:prose-invert shadow-sm transition-all duration-200',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground message-user'
                          : message.isError
                            ? 'bg-destructive/10 text-destructive message-error'
                            : 'bg-muted message-bot'
                      ]"
                    >
                      <div v-html="md.render(message.content)" class="message-content" />
                      <div v-if="message.isError" class="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          class="hover:scale-105 transition-transform"
                          @click="retryLastMessage"
                        >
                          Try Again
                        </Button>
                      </div>
                      <div 
                        v-if="message.sender === 'bot' && message.content.includes('Schedule Your Meeting')" 
                        class="mt-3"
                      >
                        <Button
                          variant="default"
                          size="sm"
                          class="w-full hover:scale-102 transition-transform flex items-center justify-center gap-1.5 font-medium"
                          @click="showCalendly = true"
                        >
                          <Calendar class="h-4 w-4" />
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div 
                    v-if="isLoading" 
                    class="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div class="bg-muted rounded-2xl px-4 py-2">
                      <div class="flex gap-1 items-center">
                        <span>Thinking</span>
                        <span class="animate-bounce">.</span>
                        <span class="animate-bounce" style="animation-delay: 0.2s">.</span>
                        <span class="animate-bounce" style="animation-delay: 0.4s">.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter class="pt-3 pb-4 px-4">
              <form
                class="flex w-full gap-2"
                @submit.prevent="sendMessage"
              >
                <Input
                  v-model="inputMessage"
                  placeholder="Type your message..."
                  class="flex-1"
                  :disabled="isLoading"
                />
                <Button 
                  type="submit"
                  :disabled="isLoading"
                >
                  <Loader2 
                    v-if="isLoading" 
                    class="h-4 w-4 animate-spin"
                  />
                  <Send
                    v-else
                    class="h-4 w-4"
                  />
                  <span class="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </div>

          <div v-else>
            <CardContent>
              <div
                id="calendly-widget"
                class="h-[450px] w-full"
              />
            </CardContent>
          </div>
        </Transition>
      </Card>
    </Transition>
  </div>
</template>