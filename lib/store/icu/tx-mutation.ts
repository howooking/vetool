import type { TxLog } from '@/types/icu'
import { create } from 'zustand'

export type TxLocalState = {
  txResult?: string | null
  txComment?: string | null
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  icuChartOrderId?: string
  icuIoId?: string
  isNotificationChecked?: boolean
  orderName?: string
} | null

type IcuUpsertTxState = {
  step: 'closed' | 'detailInsert' | 'seletctUser'
  setStep: (step: 'closed' | 'detailInsert' | 'seletctUser') => void

  txLocalState: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  txImageState: File[] | null
  setTxImageState: (txImageState: File[] | null) => void

  isDeleting: boolean
  setIsDeleting: (isDeleting: boolean) => void

  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void

  reset: () => void
}

export const useTxMutationStore = create<IcuUpsertTxState>((set) => ({
  step: 'closed',
  setStep: (step) => set({ step }),

  txLocalState: null,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),

  txImageState: null,
  setTxImageState: (txImageState) => set({ txImageState }),

  isDeleting: false,
  setIsDeleting: (isDeleting) => set({ isDeleting }),

  isMutationCanceled: false,
  setIsMutationCanceled: (isMutationCanceled) => set({ isMutationCanceled }),

  reset: () =>
    set({
      step: 'closed',
      txLocalState: null,
    }),
}))
