import { create } from 'zustand'

type IsCreatingChartState = {
  isChartLoading: boolean
  setIsChartLoading: (isChartLoading: boolean) => void
}

export const useIsChartLoadingStore = create<IsCreatingChartState>((set) => ({
  isChartLoading: false,
  setIsChartLoading: (isChartLoading) => set({ isChartLoading }),
}))
