import type { TxLog } from '@/types/icu'
import { create } from 'zustand'

export type TxLocalState = {
  txResult?: string | null
  txComment?: string | null
  txImages?: string[] | null
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  icuChartOrderId?: string
  icuIoId?: string
  isNotificationChecked?: boolean
}

type IcuUpsertTxState = {
  step: 'closed' | 'detailInsert' | 'seletctUser'
  setStep: (step: 'closed' | 'detailInsert' | 'seletctUser') => void

  isImageDialogOpen: boolean

  txLocalState?: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  isTxMutating: boolean
  setIsTxMutating: (isTxMutating: boolean) => void

  reset: () => void
}

export const useUpsertTxStore = create<IcuUpsertTxState>((set) => ({
  step: 'closed',
  setStep: (step) => set({ step }),

  isImageDialogOpen: false,

  txLocalState: undefined,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),

  isTxMutating: false,
  setIsTxMutating: (isTxMutating) => set({ isTxMutating }),

  reset: () =>
    set({
      isImageDialogOpen: false,
      step: 'closed',
      txLocalState: undefined,
    }),
}))
