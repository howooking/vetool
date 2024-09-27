import { SelectedIcuOrder } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  toggleModal: () => void

  isEditMode?: boolean
  setIsEditMode: (isEditMode: boolean) => void

  selectedChartOrder: SelectedIcuOrder
  setSelectedChartOrder: (chartOrder: SelectedIcuOrder) => void

  defaultChartId: string | undefined
  setDefaultChartId: (defaultChartId: string) => void

  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode }),

  selectedChartOrder: {} as SelectedIcuOrder,
  setSelectedChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),

  defaultChartId: undefined,
  setDefaultChartId: (defaultChartId) => set({ defaultChartId }),

  resetState: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as SelectedIcuOrder,
      defaultChartId: undefined,
    }),
}))
