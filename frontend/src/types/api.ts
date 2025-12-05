export interface UserProfile {
  id: number
  email?: string
  telegram_id?: string
  language: string
  dependency_type?: string
  motivation?: string
  goal?: string
  assistant_persona?: string
}

export interface CheckInPayload {
  mood?: number
  craving_level?: number
  triggers?: string
  notes?: string
}
