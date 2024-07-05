import type { Vet } from '@/types/hospital'
import { create } from 'zustand'

type hospitalVets = {
  vets: Vet[]
  setVets: (data: Vet[]) => void
}

export const useHospitalVetsStore = create<hospitalVets>((set) => ({
  vets: [],
  setVets: (vets) => set({ vets }),
}))
