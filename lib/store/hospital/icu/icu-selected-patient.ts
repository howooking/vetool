import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatientId: string | null
  selectedPatientName: string | null
  setSelectedPatientId: (patient: string | null) => void
  setSelectedPatientName: (name: string | null) => void
}

export const useIcuSelectedPatientStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatientId: null,
    selectedPatientName: null,
    setSelectedPatientId: (patient) => set({ selectedPatientId: patient }),
    setSelectedPatientName: (name) => set({ selectedPatientName: name }),
  }),
)
