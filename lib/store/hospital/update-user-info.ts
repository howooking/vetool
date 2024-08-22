import { create } from 'zustand'

type UpdateUserInfoState = {
  name: string | null
  avatarUrl: string | null
  setUserInfo: (name: string | null, avatarUrl: string | null) => void
}

export const useUpdateUserInfoStore = create<UpdateUserInfoState>((set) => ({
  name: null,
  avatarUrl: null,
  setUserInfo: (name, avatarUrl) => set({ name, avatarUrl }),
}))
