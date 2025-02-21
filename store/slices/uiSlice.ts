import { type StoreSlice, type BaseState } from '@/types/store'

export interface UIState extends BaseState {
  theme: 'light' | 'dark'
  isSidebarOpen: boolean
  activeModal: string | null
}

export interface UISlice extends UIState {
  setTheme: (theme: UIState['theme']) => void
  toggleSidebar: () => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

const initialState: UIState = {
  theme: 'light',
  isSidebarOpen: false,
  activeModal: null,
  status: 'idle',
  error: null,
}

export const createUISlice: StoreSlice<UISlice> = (set) => ({
  ...initialState,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
})