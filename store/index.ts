import { createStore } from '@/lib/store'
import { type AuthSlice, createAuthSlice } from './slices/authSlice'
import { type UISlice, createUISlice } from './slices/uiSlice'

interface StoreState extends AuthSlice, UISlice {}

export const useStore = createStore<StoreState>({
  initialState: {} as StoreState,
  slices: [createAuthSlice, createUISlice],
  options: {
    devtools: true,
    persist: true,
  },
})

// Typed selectors
export const selectUser = (state: StoreState) => state.user
export const selectTheme = (state: StoreState) => state.theme
export const selectIsAuthenticated = (state: StoreState) => state.isAuthenticated