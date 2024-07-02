import { create } from 'zustand'

type IcuSelectedChartCategoryState = {
  selectedCategory: 'overall' | 'icuChart'
  setSelectedCategory: (category: 'overall' | 'icuChart') => void
}

export const useIcuSelectedChartCategoryStore =
  create<IcuSelectedChartCategoryState>((set) => ({
    selectedCategory: 'overall',
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  }))
