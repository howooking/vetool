import { create } from 'zustand'

type IcuAddPatientTriggerState = {
  isOpen: boolean
  setIsOpen: () => void
}

export const useAddPatientTriggerStore = create<IcuAddPatientTriggerState>(
  (set) => ({
    isOpen: false,
    setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  }),
)
