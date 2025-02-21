import { type StateCreator } from 'zustand'

// Base types for store slices
export type StoreSlice<T extends object, E extends object = T> = StateCreator<E, [], [], T>

// Store middleware types
export interface WithDevtools {
  devtools?: boolean
}

export interface WithPersist {
  persist?: boolean
}

// Store error types
export interface StoreError {
  code: string
  message: string
  details?: unknown
}

// Store status types
export type Status = 'idle' | 'loading' | 'error' | 'success'

// Base store state interface
export interface BaseState {
  status: Status
  error: StoreError | null
}

// Store action types
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'RESET'

export interface Action<T = unknown> {
  type: ActionType
  payload?: T
  meta?: Record<string, unknown>
  error?: boolean
}

// Store selector types
export type Selector<T, U> = (state: T) => U