import { create } from 'zustand'

type RegisteringPatientState = {
  registeringPatient: {
    patientId: string
    birth: string
    patientName: string
  } | null
  setRegisteringPatient: (patient: {
    patientId: string
    birth: string
    patientName: string
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
  setStep: (
    step:
      | 'patientRegister'
      | 'icuRegister'
      | 'patientSearch'
      | 'selectChartType'
      | 'chartSearch',
  ) => void
}

export const usePatientRegisterStep = create<PatientRegisterStep>((set) => ({
  step: 'patientSearch',
  setStep: (step) => set({ step }),
}))
