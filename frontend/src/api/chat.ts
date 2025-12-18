import { apiRequest } from './client'
import { ChatMessage, ChatMessagePayload, ChatSummary } from './types'

export const chatApi = {
  history(limit = 30) {
    return apiRequest<ChatMessage[]>(`/chat/history?limit=${limit}`)
  },
  send(payload: ChatMessagePayload) {
    return apiRequest<ChatMessage>('/chat/history', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  summary() {
    return apiRequest<ChatSummary>('/chat/summary')
  },
  refreshSummary() {
    return apiRequest<ChatSummary>('/chat/summary/refresh', { method: 'POST' })
  },
}
