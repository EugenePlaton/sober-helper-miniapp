import { create } from 'zustand'

export type Persona = 'calm' | 'friendly' | 'coach' | 'toxic'

interface AppState {
  assistantPersona: Persona
  setPersona: (persona: Persona) => void
  language: 'en' | 'ru'
  setLanguage: (lang: 'en' | 'ru') => void
}

export const useAppStore = create<AppState>((set) => ({
  assistantPersona: 'calm',
  language: 'en',
  setPersona: (assistantPersona) => set({ assistantPersona }),
  setLanguage: (language) => set({ language }),
}))
