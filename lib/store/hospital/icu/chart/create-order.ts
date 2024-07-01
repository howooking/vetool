import { IcuChartOrderJoined } from '@/types/hospital'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isOpen: boolean
  mode: 'create' | 'edit'
  chartOrder: IcuChartOrderJoined
  setIsOpen: () => void
  setMode: (mode: 'create' | 'edit') => void
  setChartOrder: (chartOrder: IcuChartOrderJoined) => void
  resetState: () => void
}

const initialState: {
  mode: 'create' | 'edit'
  chartOrder: IcuChartOrderJoined
} = {
  mode: 'create',
  chartOrder: {} as IcuChartOrderJoined,
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  ...initialState,
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setMode: (mode) => set({ mode }),
  setChartOrder: (chartOrder) => set({ chartOrder }),
  resetState: () => set(initialState),
}))
