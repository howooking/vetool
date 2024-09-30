import { SelectedIcuOrder } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  toggleModal: () => void

  isEditMode?: boolean
  setIsEditMode: (isEditMode: boolean) => void

  selectedChartOrder: Partial<SelectedIcuOrder>
  setSelectedChartOrder: (chartOrder: Partial<SelectedIcuOrder>) => void

  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode }),

  selectedChartOrder: {} as Partial<SelectedIcuOrder>,
  setSelectedChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),

  resetState: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as Partial<SelectedIcuOrder>,
    }),
}))
