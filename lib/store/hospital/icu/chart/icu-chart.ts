import { IcuChartJoined } from '@/types/hospital'
import { create } from 'zustand'

type IcuChartState = {
  icuChartData: IcuChartJoined[]
  setIcuChartData: (data: IcuChartJoined[]) => void
}

export const useIcuChartStore = create<IcuChartState>((set) => ({
  icuChartData: [],
  setIcuChartData: (data) => set({ icuChartData: data }),
}))
