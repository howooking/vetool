import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatientId: string | null
  setSelectedPatientId: (patient: string | null) => void
}

export const useIcuSelectedPatientStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatientId: null,
    setSelectedPatientId: (patient) => set({ selectedPatientId: patient }),
  }),
)
