import { create } from 'zustand'

type IcuMainViewState = {
  selectdMainView: 'summary' | 'chart'
  setSelectedMainView: (category: 'summary' | 'chart') => void
}

export const useIcuMainViewStore = create<IcuMainViewState>((set) => ({
  selectdMainView: 'summary',
  setSelectedMainView: (category) => set({ selectdMainView: category }),
}))
