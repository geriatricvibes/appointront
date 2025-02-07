import apiClient from './config'
import type { AxiosResponse } from 'axios'

interface TimeSlot {
  start_time: string
  end_time: string
  is_available: boolean
}

interface AppointmentCreate {
  start_time: string
  duration_minutes: number
  summary: string
  description: string
  timezone?: string
}

export const dashboardApi = {
  /**
   * Get available appointment slots
   */
  getAvailableSlots: async (params: {
    start_date: string
    end_date: string
    duration_minutes?: number
    timezone?: string
  }): Promise<TimeSlot[]> => {
    const response: AxiosResponse<TimeSlot[]> = await apiClient.get('/api/v1/calendar/available-slots', {
      params: {
        start_date: params.start_date,
        end_date: params.end_date,
        duration_minutes: params.duration_minutes || 30,
        timezone: params.timezone || 'UTC'
      }
    })
    return response.data
  },

  /**
   * Create a new appointment
   */
  createAppointment: async (appointment: AppointmentCreate): Promise<any> => {
    const response = await apiClient.post('/api/v1/calendar/appointments', appointment)
    return response.data
  }
} 