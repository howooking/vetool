import { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isOpen: boolean
  isEditMode?: boolean
  chartOrder: IcuChartOrderJoined
  setIsOpen: () => void
  setIsEditMode: (isEditMode: boolean) => void
  setChartOrder: (chartOrder: IcuChartOrderJoined) => void
  resetState: () => void
}

const initialState: {
  isEditMode: boolean
  chartOrder: IcuChartOrderJoined
} = {
  isEditMode: false,
  chartOrder: {} as IcuChartOrderJoined,
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  ...initialState,
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setChartOrder: (chartOrder) => set({ chartOrder }),
  resetState: () => set(initialState),
}))
