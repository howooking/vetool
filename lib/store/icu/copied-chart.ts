import type { CopiedOrder } from '@/types/icu'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId?: string
  setCopiedChartId: (icuChartId?: string) => void

  copiedOrders?: CopiedOrder[]
  setCopiedOrders: (copiedOrders: CopiedOrder[]) => void

  isConfirmCopyDialogOpen: boolean
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen: boolean) => void

  reset: () => void
}

export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  copiedChartId: undefined,
  setCopiedChartId: (icuChartId?: string) => set({ copiedChartId: icuChartId }),

  copiedOrders: undefined,
  setCopiedOrders: (selectedOrders) => {
    set({ copiedOrders: selectedOrders })
  },

  isConfirmCopyDialogOpen: false,
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen) =>
    set({ isConfirmCopyDialogOpen: isCopyDialogOpen }),

  reset: () =>
    set({
      copiedChartId: undefined,
      copiedOrders: undefined,
    }),
}))
