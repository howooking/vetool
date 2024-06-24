import { create } from 'zustand'
import { format } from 'date-fns'

type IcuSelectedDateState = {
  selectedDate: string
  setSelectedDate: (date: string) => void
}

export const useIcuSelectedDateStore = create<IcuSelectedDateState>((set) => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDate: (date) => set({ selectedDate: date }),
}))
