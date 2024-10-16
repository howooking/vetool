import { TemplateChartOrders } from '@/types/icu/template'
import { create } from 'zustand'

type TemplateState = {
  templateOrders: TemplateChartOrders[]
  setTemplateOrders: (newOrder: TemplateChartOrders) => void

  isTemplateDialogOpen: boolean
  setIsTemplateDialogOpen: (isTemplateDialogOpen: boolean) => void

  reset: () => void
}

export const useTemplateStore = create<TemplateState>((set) => ({
  templateOrders: [],
  setTemplateOrders: (newOrder) =>
    set((state) => ({
      templateOrders: [...state.templateOrders, newOrder],
    })),

  isTemplateDialogOpen: false,
  setIsTemplateDialogOpen: (state) => set({ isTemplateDialogOpen: state }),

  reset: () => set({ templateOrders: [], isTemplateDialogOpen: false }),
}))
