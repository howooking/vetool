import { create } from 'zustand'

type RegisteringPatientState = {
  registeringPatient: {
    patientId: string
    birth: string
    patientName: string
    ageInDays: number
  } | null
  setRegisteringPatient: (patient: {
    patientId: string
    birth: string
    patientName: string
    ageInDays: number
  }) => void
}

export const useIcuRegisteringPatient = create<RegisteringPatientState>(
  (set) => ({
    registeringPatient: null,
    setRegisteringPatient: (patient) =>
      set({
        registeringPatient: {
          patientId: patient.patientId,
          birth: patient.birth,
          patientName: patient.patientName,
          ageInDays: patient.ageInDays,
        },
      }),
  }),
)

type PatientRegisterStep = {
  step:
    | 'patientRegister'
    | 'icuRegister'
    | 'patientSearch'
    | 'selectChartType'
    | 'chartSearch'
    | 'bookmarkSearch'
  setStep: (
    step:
      | 'patientRegister'
      | 'icuRegister'
      | 'patientSearch'
      | 'selectChartType'
      | 'chartSearch'
      | 'bookmarkSearch',
  ) => void
}

export const usePatientRegisterStep = create<PatientRegisterStep>((set) => ({
  step: 'patientSearch',
  setStep: (step) => set({ step }),
}))

type PatientRegisterDialogState = {
  isRegisterDialogOpen: boolean
  setIsRegisterDialogOpen: (isRegisterDialogOpen: boolean) => void
}

export const usePatientRegisterDialog = create<PatientRegisterDialogState>(
  (set) => ({
    isRegisterDialogOpen: false,
    setIsRegisterDialogOpen: (isRegisterDialogOpen: boolean) =>
      set({ isRegisterDialogOpen }),
  }),
)
