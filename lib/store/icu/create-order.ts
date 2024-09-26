import { IcuChartOrderJoined, SelectedIcuOrder } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  isEditMode?: boolean
  selectedChartOrder: Partial<SelectedIcuOrder>
  defaultChartId: string | undefined
  toggleModal: () => void
  setIsEditMode: (isEditMode: boolean) => void
  setChartOrder: (chartOrder: Partial<SelectedIcuOrder>) => void
  setDefaultChartId: (defaultChartId: string) => void
  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  isEditMode: false,
  selectedChartOrder: {} as SelectedIcuOrder,
  defaultChartId: undefined,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),
  setDefaultChartId: (defaultChartId) => set({ defaultChartId }),
  resetState: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as SelectedIcuOrder,
      defaultChartId: undefined,
    }),
}))
