import type {
  Hospital,
  IcuDefaultChart,
  IcuIo,
  Patients,
  User,
  UserApproval,
} from '..'

export type UserHospitalJoined = Omit<
  User,
  'email' | 'is_active' | 'created_at' | 'hos_id'
> & {
  hos_id: Pick<Hospital, 'master_user_id' | 'group_list'>
}

export type HospitalUserDataTable = Omit<
  User,
  'email' | 'is_active' | 'created_at' | 'hos_id'
> &
  Pick<Hospital, 'master_user_id' | 'group_list'> & {
    isMaster: boolean
  }

export type ApprovalData = Pick<
  UserApproval,
  'is_approved' | 'created_at' | 'updated_at'
> & {
  user_id: Pick<User, 'user_id' | 'name' | 'avatar_url' | 'is_vet'>
}

export type ApprovalDataTable = Omit<
  UserApproval,
  'user_id' | 'hos_id' | 'user_approval_id'
> &
  Pick<User, 'user_id' | 'name' | 'avatar_url' | 'is_vet'>

export type IcuOrderColors = {
  [key in
    | 'po'
    | 'feed'
    | 'test'
    | 'fluid'
    | 'manual'
    | 'checklist'
    | 'injection']: string
}

export type IcuDefaultChartJoined = Pick<
  IcuDefaultChart,
  | 'default_chart_id'
  | 'default_chart_order_name'
  | 'default_chart_order_comment'
  | 'default_chart_order_type'
> & {
  hos_id: Pick<Hospital, 'order_color'>
}
