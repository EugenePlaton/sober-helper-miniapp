import { apiRequest } from './client'
import { User } from './types'

type UserUpdatePayload = Partial<Pick<User, 'language' | 'dependency_type' | 'quit_date' | 'motivation' | 'goal' | 'assistant_persona'>>

export const profileApi = {
  me() {
    return apiRequest<User>('/users/me')
  },
  update(payload: UserUpdatePayload) {
    return apiRequest<User>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
}
