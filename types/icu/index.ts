import type {
  Hospital,
  IcuChart,
  IcuChartBookmark,
  IcuChartOrder,
  IcuChartTx,
  IcuDefaultChart,
  IcuIo,
  IcuNotification,
  Patients,
  User,
} from '@/types'

export type IcuData = {
  icuIoData: IcuIoJoined[]
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsListData: IcuUserList[]
}
export type IcuIoJoined = Pick<
  IcuIo,
  | 'in_date'
  | 'out_date'
  | 'out_due_date'
  | 'group_list'
  | 'icu_io_id'
  | 'age_in_days'
  | 'icu_io_dx'
  | 'icu_io_cc'
> & {
  patient_id: Pick<Patients, 'name' | 'breed' | 'patient_id'>
  hos_id: Pick<Hospital, 'group_list' | 'icu_memo_names' | 'order_color'>
}

export type MainAndSubVet = Pick<User, 'name' | 'avatar_url' | 'user_id'>

export type IcuChartJoined = Omit<
  IcuChart,
  | 'main_vet'
  | 'sub_vet'
  | 'patient_id'
  | 'hos_id'
  | 'icu_io_id'
  | 'bookmark_id'
  | 'created_at'
  | 'hos_id'
> & {
  icu_io_id: Pick<
    IcuIo,
    'out_date' | 'in_date' | 'icu_io_id' | 'icu_io_dx' | 'icu_io_cc'
  >
  patient_id: Pick<
    Patients,
    'name' | 'gender' | 'breed' | 'patient_id' | 'species' | 'owner_name'
  >
  main_vet: MainAndSubVet
  sub_vet: MainAndSubVet | null
  bookmark_id: Pick<
    IcuChartBookmark,
    'bookmark_name' | 'bookmark_comment' | 'bookmark_id'
  > | null
}

export type SearchedIcuIos = Pick<
  IcuIo,
  | 'icu_io_id'
  | 'out_date'
  | 'in_date'
  | 'age_in_days'
  | 'icu_io_tags'
  | 'icu_io_dx'
  | 'icu_io_cc'
> & {
  patient_id: Pick<Patients, 'name' | 'owner_name' | 'species' | 'breed'>
}

type QueriedIcuChartTx = Pick<
  IcuChartTx,
  | 'icu_chart_tx_id'
  | 'icu_chart_order_id'
  | 'icu_chart_tx_result'
  | 'icu_chart_tx_comment'
  | 'icu_chart_tx_log'
  | 'created_at'
  | 'updated_at'
>

export type IcuChartOrderJoined = Pick<
  IcuChartOrder,
  | 'icu_chart_order_id'
  | 'icu_chart_order_type'
  | 'icu_chart_order_name'
  | 'icu_chart_order_comment'
  | 'icu_chart_order_time'
> & {
  icu_io_id: Pick<
    IcuIo,
    'icu_io_id' | 'in_date' | 'created_at' | 'patient_id' | 'out_date'
  >
  icu_chart_id: Pick<IcuChart, 'target_date' | 'icu_chart_id'>
  icu_chart_order_tx_1: QueriedIcuChartTx | null
  icu_chart_order_tx_2: QueriedIcuChartTx | null
  icu_chart_order_tx_3: QueriedIcuChartTx | null
  icu_chart_order_tx_4: QueriedIcuChartTx | null
  icu_chart_order_tx_5: QueriedIcuChartTx | null
  icu_chart_order_tx_6: QueriedIcuChartTx | null
  icu_chart_order_tx_7: QueriedIcuChartTx | null
  icu_chart_order_tx_8: QueriedIcuChartTx | null
  icu_chart_order_tx_9: QueriedIcuChartTx | null
  icu_chart_order_tx_10: QueriedIcuChartTx | null
  icu_chart_order_tx_11: QueriedIcuChartTx | null
  icu_chart_order_tx_12: QueriedIcuChartTx | null
  icu_chart_order_tx_13: QueriedIcuChartTx | null
  icu_chart_order_tx_14: QueriedIcuChartTx | null
  icu_chart_order_tx_15: QueriedIcuChartTx | null
  icu_chart_order_tx_16: QueriedIcuChartTx | null
  icu_chart_order_tx_17: QueriedIcuChartTx | null
  icu_chart_order_tx_18: QueriedIcuChartTx | null
  icu_chart_order_tx_19: QueriedIcuChartTx | null
  icu_chart_order_tx_20: QueriedIcuChartTx | null
  icu_chart_order_tx_21: QueriedIcuChartTx | null
  icu_chart_order_tx_22: QueriedIcuChartTx | null
  icu_chart_order_tx_23: QueriedIcuChartTx | null
  icu_chart_order_tx_24: QueriedIcuChartTx | null
}

export type IcuUserList = Pick<
  User,
  'avatar_url' | 'name' | 'position' | 'user_id'
>

export type TxLog = {
  result: string | null
  name: string
  createdAt: string
}

export type TxState = {
  icu_chart_tx_result: string | null
  icu_chart_tx_comment: string | null
  icu_chart_tx_images: string[]
  icu_chart_tx_log: TxLog[] | null
  user_id: string | null
}

export type IcuChartBookmarkJoined = {
  icu_chart_id: {
    icu_chart_id: string
    target_date: string
    patient_id: Pick<Patients, 'name' | 'patient_id'>
    // icu_io_id: Pick<IcuIo, 'icu_io_id'>
  }
} & IcuChartBookmark

export type CopiedOrder = IcuChartOrder & {
  icu_io_id: IcuIo
}

export type SearchedIcuCharts = Pick<
  IcuChart,
  'target_date' | 'icu_chart_id' | 'patient_id'
>

export type IcuNotificationRouteJoined = IcuChartOrder & {
  icu_chart_id: Pick<IcuChart, 'target_date' | 'icu_chart_id' | 'patient_id'>
}

export type IcuNotificationJoined = IcuNotification & {
  patient_id: Pick<Patients, 'name' | 'breed' | 'gender' | 'patient_id'>
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
