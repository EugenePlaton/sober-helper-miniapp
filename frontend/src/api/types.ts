export type Persona = 'calm' | 'friendly' | 'coach' | 'toxic'

export interface User {
  id: number
  email: string | null
  telegram_id: string | null
  language: string | null
  dependency_type: string | null
  quit_date: string | null
  motivation: string | null
  goal: string | null
  assistant_persona: Persona | null
  is_active: boolean
  is_superuser: boolean
  created_at?: string | null
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface AuthResponse {
  user: User
  tokens: TokenResponse
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  language?: string
}

export interface RefreshPayload {
  refresh_token: string
}

export interface CheckInPayload {
  mood?: number
  craving_level?: number
  triggers?: string
  help_text?: string
  notes?: string
  slipped?: boolean
}

export interface CheckIn {
  id: number
  user_id: number
  mood: number | null
  craving_level: number | null
  triggers: string | null
  help_text: string | null
  notes: string | null
  slipped: boolean
  created_at?: string | null
}
