import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface PreferencesState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const usePreferencesStore = create<PreferencesState>()(
    persist<PreferencesState>(
        (set) => ({
        theme: 'light',
        setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'preferences-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default usePreferencesStore;