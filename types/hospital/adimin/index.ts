export type HospitalUserData = {
  name: string
  position: string | null
  rank: number
  group: string[] | null
  is_admin: boolean
  user_id: string
  is_vet: boolean
  avatar_url: string
  hos_id: {
    master_user_id: string
    group_list: string[]
  }
}

export type HospitalUserDataTable = {
  name: string
  position: string | null
  rank: number
  group: string[] | null
  is_admin: boolean
  user_id: string
  is_vet: boolean
  avatar_url: string
  isMaster: boolean
  master_user_id: string
  group_list: string[]
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
