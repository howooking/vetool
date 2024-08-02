import type { CopiedOrder } from '@/types/icu'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId?: string
  copiedChartOrders?: CopiedOrder[]
  isConfirmCopyDialogOpen: boolean
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen: boolean) => void
  setCopiedChartId: (icuChartId?: string) => void
  setCopiedChartOrders: (copiedChartOrder: CopiedOrder[]) => void
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
  copiedChartOrders: undefined,
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen) =>
    set({ isConfirmCopyDialogOpen: isCopyDialogOpen }),
  setCopiedChartId: (icuChartId?: string) => set({ copiedChartId: icuChartId }),
  setCopiedChartOrders: (selectedChartOrders) => {
    set({ copiedChartOrders: selectedChartOrders })
  },
  reset: () => set(initialState),
}))
