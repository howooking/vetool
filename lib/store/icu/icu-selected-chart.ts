import type { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type IcuSelectedChartState = {
  selectedIcuChartId: string
  selectedTargetDate: string
  copiedChartOrder: IcuChartOrderJoined[]
  setSelectedIcuChartId: (icuChartId: string) => void
  setSelectedTargetDate: (selectedTargetDate: string) => void
  setCopiedChartOrder: (copiedChartOrder: IcuChartOrderJoined[]) => void
}

// 특정 차트의 Chart Id를 저장하는 Store
export const useIcuSelectedChartStore = create<IcuSelectedChartState>(
  (set) => ({
    selectedIcuChartId: '',
    selectedTargetDate: '',
    copiedChartOrder: [],

    setSelectedIcuChartId: (icuChartId: string) =>
      set({ selectedIcuChartId: icuChartId }),
    setSelectedTargetDate: (selectedTargetDate: string) =>
      set({ selectedTargetDate }),
    setCopiedChartOrder: (selectedChartOrder) => {
      set({ copiedChartOrder: selectedChartOrder })
    },
  }),
)
