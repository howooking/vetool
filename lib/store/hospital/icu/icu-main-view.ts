import { create } from 'zustand'

type IcuMainViewState = {
  selectIcudMainView: 'summary' | 'chart'
  setSelectedIcuMainView: (category: 'summary' | 'chart') => void
}

export const useIcuMainViewStore = create<IcuMainViewState>((set) => ({
  selectIcudMainView: 'summary',
  setSelectedIcuMainView: (category) => set({ selectIcudMainView: category }),
}))
