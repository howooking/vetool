import { Vets } from '@/types/hospital'
import { create } from 'zustand'

type hospitalVets = {
  vets: Vets[]
  setVets: (data: Vets[]) => void
}

export const useHospitalVetsStore = create<hospitalVets>((set) => ({
  vets: [],
  setVets: (vets) => set({ vets }),
}))
