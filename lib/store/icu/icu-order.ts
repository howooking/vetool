import type { SelectedIcuOrder } from '@/types/icu/chart'
import { create } from 'zustand'

export type OrderTimePendingQueue = {
  orderTime: number
  orderId: string
  txId?: string
}

type IcuOrderState = {
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  setOrderStep: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void

  isEditMode?: boolean
  setIsEditMode: (isEditMode: boolean) => void

  selectedChartOrder: Partial<SelectedIcuOrder>
  setSelectedChartOrder: (chartOrder: Partial<SelectedIcuOrder>) => void

  selectedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setSelectedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void

  copiedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setCopiedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void

  orderTimePendingQueue: OrderTimePendingQueue[]
  setOrderTimePendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void

  selectedTxPendingQueue: OrderTimePendingQueue[]
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void

  reset: () => void
}

export const useIcuOrderStore = create<IcuOrderState>((set) => ({
  orderStep: 'closed',
  setOrderStep: (orderStep) => set({ orderStep }),

  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode }),

  selectedChartOrder: {} as Partial<SelectedIcuOrder>,
  setSelectedChartOrder: (selectedChartOrder) => set({ selectedChartOrder }),

  selectedOrderPendingQueue: [],
  setSelectedOrderPendingQueue: (updater) =>
    set((state) => ({
      selectedOrderPendingQueue:
        typeof updater === 'function'
          ? updater(state.selectedOrderPendingQueue)
          : updater,
    })),

  copiedOrderPendingQueue: [],
  setCopiedOrderPendingQueue: (updater) =>
    set((state) => ({
      copiedOrderPendingQueue:
        typeof updater === 'function'
          ? updater(state.copiedOrderPendingQueue)
          : updater,
    })),

  orderTimePendingQueue: [],
  setOrderTimePendingQueue: (updater) =>
    set((state) => ({
      orderTimePendingQueue:
        typeof updater === 'function'
          ? updater(state.orderTimePendingQueue)
          : updater,
    })),

  selectedTxPendingQueue: [],
  setSelectedTxPendingQueue: (updater) =>
    set((state) => ({
      selectedTxPendingQueue:
        typeof updater === 'function'
          ? updater(state.selectedTxPendingQueue)
          : updater,
    })),

  reset: () =>
    set({
      isEditMode: false,
      selectedChartOrder: {} as Partial<SelectedIcuOrder>,
      orderTimePendingQueue: [],
      selectedTxPendingQueue: [],
      copiedOrderPendingQueue: [],
      selectedOrderPendingQueue: [],
    }),
}))
