import { create } from 'zustand'

type IcuSelectedMainViewState = {
  selectIcudMainView: 'summary' | 'chart'
  setSelectedIcuMainView: (category: 'summary' | 'chart') => void
}

export const useSelectedMainViewStore = create<IcuSelectedMainViewState>(
  (set) => ({
    selectIcudMainView: 'summary',
    setSelectedIcuMainView: (category) => set({ selectIcudMainView: category }),
  }),
)
