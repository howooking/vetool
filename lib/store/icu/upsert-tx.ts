import type { TxLog, TxState } from '@/types/icu'
import { create } from 'zustand'

// 관련도 적은 데이터 예를 들어서 모달 오픈하고 tx데이터는 관련도가 적기때문에 객체에 묶어서하지말고 분리
export type TxLocalState = {
  txUserId?: string | null
  txResult?: string | null
  txComment?: string | null
  txImages?: string[]
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  icuChartOrderId?: string
  icuIoId?: string
}

type IcuUpsertTxState = {
  step: 'closed' | 'insertTxData' | 'seletctUser'
  setStep: (step: 'closed' | 'insertTxData' | 'seletctUser') => void
  isImageDialogOpen: boolean

  txLocalState?: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  reset: () => void
}

export const useUpsertTxStore = create<IcuUpsertTxState>((set) => ({
  step: 'closed',
  setStep: (step) => set({ step }),
  isImageDialogOpen: false,
  txLocalState: undefined,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),
  reset: () =>
    set({
      isImageDialogOpen: false,
      step: 'closed',
      txLocalState: undefined,
    }),
}))
