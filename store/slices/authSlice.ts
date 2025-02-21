import { type StoreSlice, type BaseState } from '@/types/store'

export interface User {
  id: string
  email: string
  name?: string
}

export interface AuthState extends BaseState {
  user: User | null
  isAuthenticated: boolean
}

export interface AuthSlice extends AuthState {
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set) => ({
  ...initialState,
  login: (user) =>
    set({
      user,
      isAuthenticated: true,
      status: 'success',
      error: null,
    }),
  logout: () =>
    set({
      ...initialState,
    }),
  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
})