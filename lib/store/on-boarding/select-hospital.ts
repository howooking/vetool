import { create } from 'zustand'

type SelectHospitalState = {
  hosId: string
  setHosId: (hosId: string) => void
}

export const useSelectHospitalStore = create<SelectHospitalState>((set) => ({
  hosId: '',
  setHosId: (hosId) => set({ hosId }),
}))
