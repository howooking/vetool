import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatient: string | null
  setSelectedPatient: (patient: string | null) => void
}

export const useIcuSelectedPatientStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatient: null,
    setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  }),
)
