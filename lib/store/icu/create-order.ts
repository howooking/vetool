import { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  isEditMode?: boolean
  selectedChartOrder: Partial<IcuChartOrderJoined>
  orderIndex: number | null
  toggleModal: () => void
  setIsEditMode: (isEditMode: boolean) => void
  setChartOrder: (chartOrder: Partial<IcuChartOrderJoined>) => void
  setOrderIndex: (orderIndex: number | null) => void
  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  isEditMode: false,
  selectedChartOrder: {} as IcuChartOrderJoined,
  orderIndex: null,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),
  setOrderIndex: (orderIndex) => set({ orderIndex }),
  resetState: () =>
    set({ isEditMode: false, selectedChartOrder: {} as IcuChartOrderJoined }),
}))
