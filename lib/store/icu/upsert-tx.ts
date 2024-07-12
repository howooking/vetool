import type { TxState } from '@/types/icu'
import { create } from 'zustand'

type IcuUpsertTxStateData = {
  step: 'closed' | 'insertTxData' | 'selectTxUser'
  isImageDialogOpen: boolean
  txUserId: string | null
  txState: TxState
  time: number
  txId: string
  ioId: string
  chartOrderId: string
}

type IcuUpsertTxState = {
  upsertTxState: IcuUpsertTxStateData
  setUpsertTxState: (updates: Partial<IcuUpsertTxStateData>) => void
  resetState: () => void
}

const initialState: IcuUpsertTxStateData = {
  step: 'closed',
  isImageDialogOpen: false,
  txUserId: null,
  txState: {
    icu_chart_tx_result: '',
    icu_chart_tx_comment: '',
    icu_chart_tx_images: [],
    icu_chart_tx_log: [],
    user_id: null,
  },
  time: 0,
  txId: '',
  ioId: '',
  chartOrderId: '',
}

export const useUpsertTxStore = create<IcuUpsertTxState>((set) => ({
  upsertTxState: initialState,
  setUpsertTxState: (updates) =>
    set((state) => ({ upsertTxState: { ...state.upsertTxState, ...updates } })),
  resetState: () => set({ upsertTxState: initialState }),
}))
