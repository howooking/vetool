import { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

// 특정 차트 검색 후 차트의 오더를 복사하는 상황 등 특정 차트의 오더를 저장하는 Store
type CopiedChartOrderState = {
  copiedChartOrder: IcuChartOrderJoined[]
  setCopiedChartOrder: (copiedChartOrder: IcuChartOrderJoined[]) => void
}

export const useCopiedChartOrderStore = create<CopiedChartOrderState>(
  (set) => ({
    copiedChartOrder: [],
    setCopiedChartOrder: (selectedChartOrder) => {
      set({ copiedChartOrder: selectedChartOrder })
    },
  }),
)
