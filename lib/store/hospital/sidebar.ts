import { create } from 'zustand'

type SidebarState = {
  isExpanded: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: false,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
}))
