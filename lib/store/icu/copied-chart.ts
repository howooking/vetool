import type { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId: string
  selectedTargetDate: string
  copiedChartOrder: IcuChartOrderJoined[]
  isCopyDialogOpen: boolean

  setCopiedChartId: (icuChartId: string) => void
  setSelectedTargetDate: (selectedTargetDate: string) => void
  setCopiedChartOrder: (copiedChartOrder: IcuChartOrderJoined[]) => void
  setIsCopyDialogOpen: (isCopyDialogOpen: boolean) => void
}

// 특정 차트의 Chart Id를 저장하는 Store
export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  copiedChartId: '',
  selectedTargetDate: '',
  copiedChartOrder: [],
  isCopyDialogOpen: false,

  setCopiedChartId: (icuChartId: string) => set({ copiedChartId: icuChartId }),
  setSelectedTargetDate: (selectedTargetDate: string) =>
    set({ selectedTargetDate }),
  setCopiedChartOrder: (selectedChartOrder) => {
    set({ copiedChartOrder: selectedChartOrder })
  },
  setIsCopyDialogOpen: () =>
    set((state) => ({ isCopyDialogOpen: !state.isCopyDialogOpen })),
}))
