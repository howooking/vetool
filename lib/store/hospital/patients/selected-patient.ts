import { create } from 'zustand'

type SelectHospitalState = {
  patientId: string | null
  setPatientId: (patientId: string) => void
}

export const useSelectedPatientStore = create<SelectHospitalState>((set) => ({
  patientId: null,
  setPatientId: () => set((state) => ({ patientId: state.patientId })),
}))
