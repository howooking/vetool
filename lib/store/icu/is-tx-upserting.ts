import { create } from 'zustand'

type IsTxUpsertingState = {
  isTxUpserting: boolean
  setIsTxUpserting: (isTxUpserting: boolean) => void
}

export const useIsTxUpserting = create<IsTxUpsertingState>((set) => ({
  isTxUpserting: false,
  setIsTxUpserting: (isTxUpserting) => set({ isTxUpserting }),
}))
