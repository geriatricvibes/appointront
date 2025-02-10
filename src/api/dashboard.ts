import apiClient from './config'

interface CalendlyTokenResponse {
  message: string
}

interface CalendlyConnectionStatus {
  is_connected: boolean;
  needs_refresh?: boolean;
  message: string;
}

interface Source {
  id: string;
  title: string;
  url?: string;
  created_at: string;
  content?: string;
}

interface AddSourceRequest {
  url?: string;
  content?: string;
  title: string;
}

export const dashboardApi = {
  /**
   * Exchange Calendly OAuth code for tokens
   */
  exchangeCalendlyCode: async (params: {
    code: string;
    redirect_uri: string;
  }): Promise<CalendlyTokenResponse> => {
    const response = await apiClient.post('/api/v1/calendly/oauth/callback', params)
    return response.data
  },

  /**
   * Get Calendly connection status
   */
  getCalendlyStatus: async (): Promise<CalendlyConnectionStatus> => {
    const response = await apiClient.get('/api/v1/calendly/connection-status')
    return response.data
  },

  /**
   * Add a new knowledge source
   */
  addSource: async (params: AddSourceRequest): Promise<{ message: string; id: string }> => {
    const response = await apiClient.post('/api/v1/calendly/sources', params)
    return response.data
  },

  /**
   * Get all knowledge sources
   */
  getSources: async (): Promise<Source[]> => {
    const response = await apiClient.get('/api/v1/calendly/sources')
    return response.data
  },

  /**
   * Get source details
   */
  getSourceDetails: async (sourceId: string): Promise<Source> => {
    const response = await apiClient.get(`/api/v1/calendly/sources/${sourceId}`)
    return response.data
  },

  /**
   * Delete a source
   */
  deleteSource: async (sourceId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/api/v1/calendly/sources/${sourceId}`)
    return response.data
  }
}