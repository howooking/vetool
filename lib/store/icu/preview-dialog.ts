import { create } from 'zustand'

type PreviewDialogState = {
  isPreviewDialogOpen: boolean
  setPreviewDialogOpen: (isOpen: boolean) => void
}

export const usePreviewDialogStore = create<PreviewDialogState>((set) => ({
  isPreviewDialogOpen: false,
  setPreviewDialogOpen: (state) => set({ isPreviewDialogOpen: state }),
}))
