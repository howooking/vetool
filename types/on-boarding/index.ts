export type SelectHosptialDataTable = {
  hos_id: string
  name: string
  city: string
  district: string
}

export type UserApproval = {
  user_approval_id: string
  hos_id: {
    name: string
  }
}
