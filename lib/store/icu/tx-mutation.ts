import type { TxLog } from '@/types/icu'
import { create } from 'zustand'

export type TxLocalState = {
  txResult?: string | null
  txComment?: string | null
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  txImages?: string[] | null
  icuChartOrderId?: string
  icuIoId?: string
  isNotificationChecked?: boolean
  orderName?: string
} | null

type IcuUpsertTxState = {
  step: 'closed' | 'detailInsert' | 'seletctUser'
  setStep: (step: 'closed' | 'detailInsert' | 'seletctUser') => void

  // mutationType: 'insert' | 'update' | 'delete' | null
  // setMutationType: (mutationType: 'insert' | 'update' | 'delete') => void

  // isImageDialogOpen: boolean

  txLocalState: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  txImageState: File[] | null
  setTxImageState: (txImageState: File[] | null) => void

  isDeleting: boolean
  setIsDeleting: (isDeleting: boolean) => void

  // isTxMutating: boolean
  // setIsTxMutating: (isTxMutating: boolean) => void

  // cellId?: string
  // setCellId: (cellId: string) => void

  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void

  reset: () => void
}

export const useTxMutationStore = create<IcuUpsertTxState>((set) => ({
  // briefTxResultInput: '',
  // setBriefTxResultInput: (briefTxResultInput: string) =>
  //   set({ briefTxResultInput }),

  step: 'closed',
  setStep: (step) => set({ step }),

  // mutationType: null,
  // setMutationType: (mutationType) => set({ mutationType }),

  // isImageDialogOpen: false,

  txLocalState: null,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),

  txImageState: null,
  setTxImageState: (txImageState) => set({ txImageState }),

  isDeleting: false,
  setIsDeleting: (isDeleting) => set({ isDeleting }),

  // isTxMutating: false,
  // setIsTxMutating: (isTxMutating) => set({ isTxMutating }),

  // cellId: undefined,
  // setCellId: (cellId) => set({ cellId }),

  isMutationCanceled: false,
  setIsMutationCanceled: (isMutationCanceled) => set({ isMutationCanceled }),

  reset: () =>
    set({
      // isImageDialogOpen: false,
      step: 'closed',
      txLocalState: null,
      // mutationType: null,
    }),
}))
