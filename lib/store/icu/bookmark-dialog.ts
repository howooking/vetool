import { create } from 'zustand'

type BookmarkDialogState = {
  isBookmarkDialogOpen: boolean
  setBookmarkDialogOpen: (isBookmarkModalOpen: boolean) => void
}

export const useBookmarkDialogStore = create<BookmarkDialogState>((set) => ({
  isBookmarkDialogOpen: false,
  setBookmarkDialogOpen: (state) => set({ isBookmarkDialogOpen: state }),
}))
