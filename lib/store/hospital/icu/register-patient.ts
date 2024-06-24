import { create } from 'zustand'

type IcuRegisterPatientState = {
  isNextStep: boolean
  setIsNextStep: () => void
}

export const useIcuRegisterPatientStore = create<IcuRegisterPatientState>(
  (set) => ({
    isNextStep: false,
    setIsNextStep: () => set((state) => ({ isNextStep: !state.isNextStep })),
  }),
)
