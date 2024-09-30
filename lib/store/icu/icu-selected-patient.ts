// 삭제 예정

import { create } from 'zustand'

type IcuSelectedPatientState = {
  selectedPatientId: string | null
  setSelectedPatientId: (patientId: string | null) => void
}

export const useIcuSelectedPatientIdStore = create<IcuSelectedPatientState>(
  (set) => ({
    selectedPatientId: null,
    setSelectedPatientId: (patientId) => set({ selectedPatientId: patientId }),
  }),
)
