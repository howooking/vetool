import { create } from 'zustand'

type OrderPreviewState = {
  isPreviewModalOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const useOrderPreviewStore = create<OrderPreviewState>((set) => ({
  isPreviewModalOpen: false,
  onOpenChange: (state) => set({ isPreviewModalOpen: state }),
}))
