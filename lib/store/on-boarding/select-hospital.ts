import { create } from 'zustand'

type SelectHospitalState = {
  hosId: string
}

export const useSelectHospitalStore = create<SelectHospitalState>(() => ({
  hosId: '',
}))
