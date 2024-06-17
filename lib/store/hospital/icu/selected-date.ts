import { create } from 'zustand'
import { format } from 'date-fns'

type SelectedDateState = {
  selectedDate: string
  setSelectedDatea: (date: string) => void
}

export const useSelectedDateStore = create<SelectedDateState>((set) => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDatea: (date) => set({ selectedDate: date }),
}))
