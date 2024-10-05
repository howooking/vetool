import type { SelectedIcuOrder } from '@/types/icu/chart'
import { create } from 'zustand'

export type OrderTimePendingQueue = {
  orderTime: number
  orderId: string
}

type IcuOrderState = {
  step: 'closed' | 'upsert' | 'selectOrderer'
  setStep: (step: 'closed' | 'upsert' | 'selectOrderer') => void

  isEditMode?: boolean
  setIsEditMode: (isEditMode: boolean) => void

  selectedChartOrder: Partial<SelectedIcuOrder>
  setSelectedChartOrder: (chartOrder: Partial<SelectedIcuOrder>) => void

  orderTimePendingQueue: OrderTimePendingQueue[]
  setOrderTimePendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void

  reset: () => void
}

export const useIcuOrderStore = create<IcuOrderState>((set) => ({
  step: 'closed',
  setStep: (step) => set({ step }),

  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode }),

  selectedChartOrder: {} as Partial<SelectedIcuOrder>,
  setSelectedChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),

  orderTimePendingQueue: [],
  setOrderTimePendingQueue: (updater) =>
    set((state) => ({
      orderTimePendingQueue:
        typeof updater === 'function'
          ? updater(state.orderTimePendingQueue)
          : updater,
    })),

  reset: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as Partial<SelectedIcuOrder>,
      orderTimePendingQueue: [],
    }),
}))
