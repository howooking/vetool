import { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  isEditMode?: boolean
  selectedChartOrder: IcuChartOrderJoined
  toggleModal: () => void
  setIsEditMode: (isEditMode: boolean) => void
  setChartOrder: (chartOrder: IcuChartOrderJoined) => void
  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  isEditMode: false,
  selectedChartOrder: {} as IcuChartOrderJoined,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),
  resetState: () =>
    set({ isEditMode: false, selectedChartOrder: {} as IcuChartOrderJoined }),
}))
