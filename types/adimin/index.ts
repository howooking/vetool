import { Users } from '..'

export type UserHospitalJoined = Omit<
  Users,
  'email' | 'is_active' | 'created_at' | 'hos_id'
> & {
  hos_id: {
    master_user_id: string
    group_list: string[]
  }
}

export type HospitalUserDataTable = Omit<
  Users,
  'email' | 'is_active' | 'created_at' | 'hos_id'
> & {
  master_user_id: string
  group_list: string[]
  isMaster: boolean
}

export type ApprovalData = {
  created_at: string
  updated_at: string
  is_approved: boolean
  user_id: {
    name: string
    user_id: string
    avatar_url: string
    is_vet: boolean
  }
}

export type ApprovalDataTable = {
  created_at: string
  updated_at: string
  is_approved: boolean
  name: string
  user_id: string
  avatar_url: string
  is_vet: boolean
}
