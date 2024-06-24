import { create } from 'zustand'

type IcuSelectedChartCategoryState = {
  selectedCategory: string | null
  setSelectedCategory: (category: string) => void
}

export const useIcuSelectedChartCategoryStore =
  create<IcuSelectedChartCategoryState>((set) => ({
    selectedCategory: 'overall',
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  }))
