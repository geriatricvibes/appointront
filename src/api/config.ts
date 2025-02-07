import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Request interceptor
apiClient.interceptors.request.use(async (config) => {
  const { getAuthToken } = useAuth()
  const token = await getAuthToken()
  
  if (token) {
    // Ensure we're setting the Authorization header correctly
    config.headers['Authorization'] = `Bearer ${token}`
    
    // Debug log the actual token in development
    if (import.meta.env.DEV) {
      console.log('Debug - Auth Token:', token)
      console.log('Debug - Full Headers:', config.headers)
    }
  } else {
    console.warn('No auth token available')
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
      params: config.params,
    })
  }

  return config
}, (error) => {
  console.error('Request interceptor error:', error)
  return Promise.reject(error)
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
