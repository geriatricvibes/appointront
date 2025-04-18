import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

// Get the base URL from environment variables
let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Force HTTPS for production servers
if (baseURL.includes('server.justbookme.ai') && baseURL.startsWith('http:')) {
  baseURL = baseURL.replace('http:', 'https:')
}

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(async (config) => {
  const { getAuthToken } = useAuth()
  const token = await getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: { ...config.headers, Authorization: token ? 'Bearer [REDACTED]' : undefined },
      data: config.data,
      params: config.params,
    })
  }

  return config
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Development logging
    if (import.meta.env.DEV) {
      console.log('📥 API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        data: response.data,
      })
    }
    return response
  },
  (error) => {
    // Development logging
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })
    }
    return Promise.reject(error)
  }
)

// Custom EventSource wrapper with auth
export const createAuthenticatedEventSource = async (path: string) => {
  const { getAuthToken } = useAuth()
  const token = await getAuthToken()
  
  const url = new URL(path, baseURL)
  if (token) {
    url.searchParams.append('token', token)
  }
  
  return new EventSource(url.toString())
}

export default apiClient
