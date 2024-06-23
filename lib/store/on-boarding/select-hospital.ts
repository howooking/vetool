import { create } from 'zustand'

type SelectHospitalState = {
  hosId: string
  setHosId: (hosId: string) => void
}

export const useSelectHospitalStore = create<SelectHospitalState>((set) => ({
  hosId: '',
  setHosId: () => set((state) => ({ hosId: state.hosId })),
}))
