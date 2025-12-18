import { apiRequest } from './client'
import { Subscription, SubscriptionPayload } from './types'

export const subscriptionApi = {
  get() {
    return apiRequest<Subscription>('/subscriptions')
  },
  update(payload: SubscriptionPayload) {
    return apiRequest<Subscription>('/subscriptions', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
}
