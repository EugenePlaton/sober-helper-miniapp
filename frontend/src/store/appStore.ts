import { create } from 'zustand'

export type Persona = 'calm' | 'friendly' | 'coach' | 'toxic'

interface AppState {
  assistantPersona: Persona
  setPersona: (persona: Persona) => void
  language: 'en' | 'ru'
  setLanguage: (lang: 'en' | 'ru') => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>((set) => ({
  assistantPersona: 'calm',
  language: 'en',
  theme: 'light',
  setPersona: (assistantPersona) => set({ assistantPersona }),
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
}))
