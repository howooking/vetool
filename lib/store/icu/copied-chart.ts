import type { CopiedOrder } from '@/types/icu'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId?: string
  copiedOrders?: CopiedOrder[]
  isConfirmCopyDialogOpen: boolean
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen: boolean) => void
  setCopiedChartId: (icuChartId?: string) => void
  setCopiedOrders: (copiedOrders: CopiedOrder[]) => void
  reset: () => void
}

const initialState = {
  copiedChartId: undefined,
  copiedChartOrder: undefined,
}

// 특정 차트의 Chart Id를 저장하는 Store
export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  copiedChartId: undefined,
  isConfirmCopyDialogOpen: false,
  copiedOrders: undefined,
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen) =>
    set({ isConfirmCopyDialogOpen: isCopyDialogOpen }),
  setCopiedChartId: (icuChartId?: string) => set({ copiedChartId: icuChartId }),
  setCopiedOrders: (selectedOrders) => {
    set({ copiedOrders: selectedOrders })
  },
  reset: () => set(initialState),
}))
