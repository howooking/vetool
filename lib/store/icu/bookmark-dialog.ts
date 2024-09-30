import { create } from 'zustand'

type BookmarkDialogState = {
  isBookmarkDialogOpen: boolean
  setBookmarkDilaogOpen: (isBookmarkModalOpen: boolean) => void
}

export const useBookmarkDialogStore = create<BookmarkDialogState>((set) => ({
  isBookmarkDialogOpen: false,
  setBookmarkDilaogOpen: (state) => set({ isBookmarkDialogOpen: state }),
}))
