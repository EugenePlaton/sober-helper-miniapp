import { apiRequest } from './client'
import { CheckIn, CheckInPayload } from './types'

export const checkInApi = {
  create(payload: CheckInPayload) {
    return apiRequest<CheckIn>('/check-ins', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  list(limit = 10) {
    return apiRequest<CheckIn[]>(`/check-ins?limit=${limit}`)
  },
}
