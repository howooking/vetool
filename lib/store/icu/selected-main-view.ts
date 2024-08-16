import { create } from 'zustand'

export type IcuMainViewEnum = 'summary' | 'chart' | 'search' | 'tx-table'

type IcuSelectedMainViewState = {
  selectIcudMainView: IcuMainViewEnum
  setSelectedIcuMainView: (category: IcuMainViewEnum) => void
}

export const useSelectedMainViewStore = create<IcuSelectedMainViewState>(
  (set) => ({
    selectIcudMainView: 'summary',
    setSelectedIcuMainView: (category) => set({ selectIcudMainView: category }),
  }),
)
