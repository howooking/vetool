import { create } from 'zustand'

type IcuBookmarkState = {
  isBookmarkModalOpen: boolean
  setBookmarkModalOpen: (isBookmarkModalOpen: boolean) => void
}

export const useIcuBookmarkStore = create<IcuBookmarkState>((set) => ({
  isBookmarkModalOpen: false,
  setBookmarkModalOpen: (state) => set({ isBookmarkModalOpen: state }),
}))
