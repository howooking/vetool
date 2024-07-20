import { create } from 'zustand'

type IsCreatingChartState = {
  isCreatingChart: boolean
  setIsCreatingChart: (isCreatingChart: boolean) => void
}

export const useIsCreatingChartStore = create<IsCreatingChartState>((set) => ({
  isCreatingChart: false,
  setIsCreatingChart: (isCreatingChart) => set({ isCreatingChart }),
}))
