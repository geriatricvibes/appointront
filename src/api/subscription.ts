import apiClient from './config'

interface SubscriptionResponse {
  payment_link: string;
  subscription_id: string;
}

interface SubscriptionDetails {
  id: string;
  dodo_subscription_id: string;
  status: string;
  current_period_start?: string;
  current_period_end?: string;
  amount?: number;
  currency?: string;
  created_at: string;
  is_cancelled_but_active: boolean;
  has_unlimited_access: boolean;
}

interface SubscriptionStatusResponse {
  has_subscription: boolean;
  subscription?: SubscriptionDetails;
  has_active_tier: boolean;
}

interface CustomerPortalResponse {
  portal_link: string;
  message: string;
}

export const subscriptionApi = {
  /**
   * Create a new subscription for the current user
   */
  createSubscription: async (): Promise<SubscriptionResponse> => {
    const response = await apiClient.post('/api/v1/subscriptions/create-subscription', {})
    return response.data
  },

  /**
   * Get current user's subscription status
   */
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await apiClient.get('/api/v1/subscriptions/get')
    return response.data
  },

  /**
   * Cancel the current user's subscription through customer portal
   */
  cancelSubscription: async (): Promise<CustomerPortalResponse> => {
    const response = await apiClient.post('/api/v1/subscriptions/cancel')
    return response.data
  }
} 