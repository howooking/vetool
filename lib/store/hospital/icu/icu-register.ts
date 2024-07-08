import { create } from 'zustand'

type RegisteringPatientState = {
  registeringPatient: {
    patientId: string | null
    birth: string | null
  }
  setRegisteringPatient: (patient: { patientId: string; birth: string }) => void
}

export const useIcuRegisteringPatient = create<RegisteringPatientState>(
  (set) => ({
    registeringPatient: {
      patientId: null,
      birth: null,
    },
    setRegisteringPatient: (patient) =>
      set({
        registeringPatient: {
          patientId: patient.patientId,
          birth: patient.birth,
        },
      }),
  }),
)

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
