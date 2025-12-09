import { useAuthStore } from '../store/authStore'
import { RefreshPayload, TokenResponse } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions extends RequestInit {
  method?: HttpMethod
  retry?: boolean
}

const refreshTokens = async (refreshToken: string): Promise<TokenResponse> => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken } as RefreshPayload),
  })
  if (!res.ok) throw new Error('Failed to refresh token')
  return res.json()
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { accessToken, refreshToken, setTokens, clear } = useAuthStore.getState()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 401 && refreshToken && !options.retry) {
    try {
      const tokens = await refreshTokens(refreshToken)
      setTokens(tokens)
      return apiRequest<T>(path, { ...options, retry: true })
    } catch (e) {
      clear()
      throw e
    }
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Request failed')
  }

  if (response.status === 204) return undefined as T
  return response.json()
}
