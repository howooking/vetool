import { create } from 'zustand'

type IcuSelectedMainViewState = {
  selectIcudMainView: 'summary' | 'chart' | 'search'
  setSelectedIcuMainView: (category: 'summary' | 'chart' | 'search') => void
}

export const useSelectedMainViewStore = create<IcuSelectedMainViewState>(
  (set) => ({
    selectIcudMainView: 'summary',
    setSelectedIcuMainView: (category) => set({ selectIcudMainView: category }),
  }),
)
