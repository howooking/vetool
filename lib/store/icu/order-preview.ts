import { create } from 'zustand'

type OrderPreviewState = {
  isPreviewModalOpen: boolean
  setPreviewModalOpen: (isOpen: boolean) => void
}

export const useOrderPreviewStore = create<OrderPreviewState>((set) => ({
  isPreviewModalOpen: false,
  setPreviewModalOpen: (state) => set({ isPreviewModalOpen: state }),
}))
