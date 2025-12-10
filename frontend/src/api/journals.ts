import { apiRequest } from './client'
import { Journal, JournalPayload } from './types'

export const journalApi = {
  list(limit = 20) {
    return apiRequest<Journal[]>(`/journals?limit=${limit}`)
  },
  create(payload: JournalPayload) {
    return apiRequest<Journal>('/journals', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
