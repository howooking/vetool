import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatient: {
    patientName: string
    patientId: string
  } | null
  setSelectedPatient: (
    patient: {
      patientName: string
      patientId: string
    } | null,
  ) => void
}

export const useIcuSelectedPatientStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatient: null,
    setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  }),
)
