// unused 예정

import { create } from 'zustand'

type IsChartLoadingState = {
  isChartLoading: boolean
  setIsChartLoading: (isChartLoading: boolean) => void
}

export const useIsChartLoadingStore = create<IsChartLoadingState>((set) => ({
  isChartLoading: false,
  setIsChartLoading: (isChartLoading) => set({ isChartLoading }),
}))
