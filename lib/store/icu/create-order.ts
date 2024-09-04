import { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type IcuCreateOrderState = {
  isModalOpen: boolean
  isEditMode?: boolean
  selectedChartOrder: Partial<IcuChartOrderJoined>
  defaultChartId: string | undefined
  toggleModal: () => void
  setIsEditMode: (isEditMode: boolean) => void
  setChartOrder: (chartOrder: Partial<IcuChartOrderJoined>) => void
  setDefaultChartId: (defaultChartId: string) => void
  resetState: () => void
}

export const useCreateOrderStore = create<IcuCreateOrderState>((set) => ({
  isModalOpen: false,
  isEditMode: false,
  selectedChartOrder: {} as IcuChartOrderJoined,
  defaultChartId: undefined,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),
  setDefaultChartId: (defaultChartId) => set({ defaultChartId }),
  resetState: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as IcuChartOrderJoined,
      defaultChartId: undefined,
    }),
}))
