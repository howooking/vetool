import { format } from 'date-fns'
import { create } from 'zustand'

type IcuSelectedDateState = {
  selectedDate: string
  setSelectedDate: (date: string) => void
}

export const useIcuSelectedDateStore = create<IcuSelectedDateState>((set) => ({
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  setSelectedDate: (date) => set({ selectedDate: date }),
}))
