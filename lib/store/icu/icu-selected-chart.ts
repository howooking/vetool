import { create } from 'zustand'

type IcuSelectedChartState = {
  icuChartId: string
  selectedTargetDate: string
  setIcuChartId: (icuChartId: string) => void
  setSelectedTargetDate: (selectedTargetDate: string) => void
}

// 특정 차트의 Chart Id를 저장하는 Store
export const useIcuSelectedChartStore = create<IcuSelectedChartState>(
  (set) => ({
    icuChartId: '',
    selectedTargetDate: '',
    setIcuChartId: (icuChartId: string) => set({ icuChartId }),
    setSelectedTargetDate: (selectedTargetDate: string) =>
      set({ selectedTargetDate }),
  }),
)
