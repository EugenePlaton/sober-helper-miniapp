import { apiRequest } from './client'
import { Settings, SettingsPayload } from './types'

export const settingsApi = {
  get() {
    return apiRequest<Settings>('/settings')
  },
  update(payload: SettingsPayload) {
    return apiRequest<Settings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
}
