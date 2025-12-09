import { apiRequest } from './client'
import { AuthResponse, LoginPayload, RegisterPayload, TokenResponse } from './types'
import { useAuthStore } from '../store/authStore'

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    useAuthStore.getState().setAuth(data)
    return data
  },
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    useAuthStore.getState().setAuth(data)
    return data
  },
  async refresh(refreshToken: string): Promise<TokenResponse> {
    const data = await apiRequest<TokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    useAuthStore.getState().setTokens(data)
    return data
  },
  logout() {
    useAuthStore.getState().clear()
  },
}
