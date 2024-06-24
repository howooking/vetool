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
