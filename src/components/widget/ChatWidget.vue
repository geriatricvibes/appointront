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
import { ArrowLeft } from 'lucide-vue-next'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  isError?: boolean
}

interface CalendlyUserInfo {
  scheduling_url: string
  // ... other fields
}

const isOpen = ref(false)
const inputMessage = ref('')
const STORAGE_KEY = 'chat_messages'

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

const toggleWidget = () => {
  isOpen.value = !isOpen.value
  // Reset to chat view when closing widget
  if (!isOpen.value) {
    showCalendly.value = false
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

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

    const botMessage: Message = {
      id: crypto.randomUUID(),
      content: response.message,
      sender: 'bot' as const,
      timestamp: new Date()
    }
    messages.value.push(botMessage)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
    
    initCalendly(response.message)
  } catch (error) {
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      content: 'Sorry, I encountered an error while processing your request. Please try again.',
      sender: 'bot' as const,
      timestamp: new Date(),
      isError: true
    }
    messages.value.push(errorMessage)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
    console.error('Chat error:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    calendlyUserInfo.value = await chatApi.getUserInfo()
  } catch (error) {
    console.error('Failed to fetch Calendly info:', error)
  }
})

const initCalendly = (content: string) => {
  if (content.includes('<book>') && calendlyUserInfo.value?.scheduling_url) {
    showCalendly.value = true
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
      <i-heroicons-chat-bubble-left-right class="h-6 w-6" />
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
            <CardContent>
              <ScrollArea class="h-[400px] pr-4">
                <div class="space-y-4">
                  <div
                    v-for="message in messages"
                    :key="message.id"
                    :class="[
                      'flex',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    ]"
                  >
                    <div
                      :class="[
                        'rounded-lg px-4 py-2 max-w-[80%] prose prose-sm dark:prose-invert',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.isError
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-muted'
                      ]"
                    >
                      <div v-html="md.render(message.content)" />
                      <div v-if="message.content.includes('<book>') && calendlyUserInfo?.scheduling_url" class="mt-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          @click="showCalendly = true"
                        >
                          Schedule a meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div v-if="isLoading" class="flex justify-start">
                    <div class="bg-muted rounded-lg px-4 py-2">
                      Thinking...
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter>
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
                  Send
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