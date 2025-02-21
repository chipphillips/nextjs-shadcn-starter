import { create, type StateCreator } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import type { WithDevtools, WithPersist } from '@/types/store'

// Create a store with optional middleware
export function createStore<T extends object>({
  initialState,
  slices,
  options: { devtools: withDevtools = true, persist: withPersist = false } = {},
}: {
  initialState: T
  slices: StateCreator<T, [], [], T>[]
  options?: WithDevtools & WithPersist
}) {
  let store = () => initialState

  // Combine slices
  slices.forEach((slice) => {
    store = slice as StateCreator<T, [], [], T>
  })

  // Add middleware
  if (withDevtools) {
    store = devtools(store)
  }

  if (withPersist) {
    store = persist(store, {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    })
  }

  return create(store)
}

// Create a selector with memoization
export function createSelector<T, U>(selector: (state: T) => U) {
  let lastState: T
  let lastResult: U

  return (state: T): U => {
    if (state === lastState) {
      return lastResult
    }

    lastState = state
    lastResult = selector(state)
    return lastResult
  }
}