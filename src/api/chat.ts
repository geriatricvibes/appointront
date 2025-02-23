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
  book: boolean
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
    const response = await apiClient.post('/api/v1/scheduling/chat', params, {
      headers: {
        'X-API-Key': localStorage.getItem('api_key') || ''
      }
    })
    return response.data
  },

  /**
   * Get user's Calendly information
   */
  getUserInfo: async (): Promise<CalendlyUserInfo> => {
    const response = await apiClient.get('/api/v1/scheduling/user-info', {
      headers: {
        'X-API-Key': localStorage.getItem('api_key') || ''
      }
    })
    return response.data
  },

  /**
   * Get user's API key
   */
  getApiKey: async (): Promise<string> => {
    const response = await apiClient.get('/api/v1/users/me/api-key')
    const { api_key } = response.data
    localStorage.setItem('api_key', api_key)
    return api_key
  }
} 