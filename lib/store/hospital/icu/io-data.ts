import { IcuIo } from '@/types/hospital'
import { create } from 'zustand'

type IcuIoData = {
  ioData: IcuIo[]
  setIoData: (ioData: IcuIo[]) => void
}

export const useIoDataStore = create<IcuIoData>((set) => ({
  ioData: [],
  setIoData: (ioData) => set({ ioData: ioData }),
}))
