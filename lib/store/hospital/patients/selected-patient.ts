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

type PatientRegisterStep = {
  step:
    | 'ownerSearch'
    | 'ownerRegister'
    | 'patientRegister'
    | 'icuRegister'
    | 'patientSearch'
  setStep: (
    step:
      | 'ownerSearch'
      | 'ownerRegister'
      | 'patientRegister'
      | 'icuRegister'
      | 'patientSearch',
  ) => void
}

export const usePatientRegisterStep = create<PatientRegisterStep>((set) => ({
  step: 'ownerSearch',
  setStep: (step) => set({ step }),
}))
