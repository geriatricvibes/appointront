import apiClient from './config'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  isError?: boolean
}

interface SchedulingMessageRequest {
  message: string
  days_range: number
  chat_history: Message[]
  is_current_message: boolean
}

interface SchedulingMessageResponse {
  message: string
  status: 'success' | 'error'
}

interface CalendlyUserInfo {
  name: string
  scheduling_url: string
  timezone: string
  email: string
  avatar_url: string
  slug: string
}

export const chatApi = {
  /**
   * Send a message to the scheduling chat service
   */
  sendMessage: async (params: SchedulingMessageRequest): Promise<SchedulingMessageResponse> => {
    const response = await apiClient.post('/api/v1/calendly/chat', params)
    return response.data
  },

  /**
   * Get user's Calendly information
   */
  getUserInfo: async (): Promise<CalendlyUserInfo> => {
    const response = await apiClient.get('/api/v1/calendly/user-info')
    return response.data
  }
} 