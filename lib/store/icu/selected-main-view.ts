// 삭제 예정

import { create } from 'zustand'

export type IcuMainViewEnum =
  | 'summary'
  | 'chart'
  | 'search'
  | 'tx-table'
  | 'bookmark'

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
