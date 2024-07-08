import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatientId: string | null
  setSelectedPatientId: (patientId: string | null) => void
}

export const useIcuSelectedPatientStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatientId: null,
    setSelectedPatientId: (patientId) => set({ selectedPatientId: patientId }),
  }),
)
