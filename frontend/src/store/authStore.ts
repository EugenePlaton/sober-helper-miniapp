import { create } from 'zustand'
import { AuthResponse, TokenResponse, User } from '../api/types'

type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}

interface AuthState extends Tokens {
  user: User | null
  setAuth: (payload: AuthResponse) => void
  setTokens: (tokens: TokenResponse) => void
  clear: () => void
}

const STORAGE_KEY = 'sober_helper_auth'

const loadState = (): { user: User | null; accessToken: string | null; refreshToken: string | null } => {
  if (typeof localStorage === 'undefined') return { user: null, accessToken: null, refreshToken: null }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { user: null, accessToken: null, refreshToken: null }
    return JSON.parse(raw)
  } catch {
    return { user: null, accessToken: null, refreshToken: null }
  }
}

const persist = (state: Pick<AuthState, 'user' | 'accessToken' | 'refreshToken'>) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }),
  )
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...loadState(),
  setAuth: (payload) => {
    const next = {
      user: payload.user,
      accessToken: payload.tokens.access_token,
      refreshToken: payload.tokens.refresh_token,
    }
    persist(next)
    set(next)
  },
  setTokens: (tokens) => {
    const next = {
      user: get().user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    }
    persist(next)
    set(next)
  },
  clear: () => {
    persist({ user: null, accessToken: null, refreshToken: null })
    set({ user: null, accessToken: null, refreshToken: null })
  },
}))
