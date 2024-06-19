import { create } from 'zustand'

type SelectHospitalState = {
  patientId: string | null
  birth: string | null
  setPatientId: (patientId: string | null) => void
  setBirth: (patientId: string | null) => void
}

export const useSelectedPatientStore = create<SelectHospitalState>((set) => ({
  patientId: null,
  birth: null,
  setPatientId: (patientId) => set({ patientId }),
  setBirth: (birth) => set({ birth }),
}))
