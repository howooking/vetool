import type {
  Hospital,
  IcuChart,
  IcuChartOrder,
  IcuChartTx,
  IcuIo,
  IcuChartBookmark,
  Patients,
  User,
} from '@/types'

export type IcuIoPatientJoined = Omit<IcuIo, 'patient_id'> & {
  patient_id: Pick<Patients, 'name' | 'breed' | 'patient_id'>
}

export type MainAndSubVet = Pick<User, 'name' | 'avatar_url' | 'user_id'>

export type IcuChartJoined = Omit<
  IcuChart,
  'main_vet' | 'sub_vet' | 'patient_id' | 'icu_io_id' | 'hos_id'
> & {
  hos_id: Pick<Hospital, 'group_list' | 'icu_memo_names'>
  patient_id: Pick<
    Patients,
    'name' | 'gender' | 'breed' | 'patient_id' | 'species' | 'owner_name'
  >
  main_vet: MainAndSubVet
  sub_vet: MainAndSubVet | null
  bookmark_id: Pick<
    IcuChartBookmark,
    'bookmark_name' | 'bookmark_comment' | 'bookmark_id'
  >
}

export type IcuChartListJoined = Pick<
  IcuChart,
  | 'icu_chart_id'
  | 'target_date'
  | 'icu_chart_dx'
  | 'icu_chart_cc'
  | 'icu_chart_tags'
> & {
  patient_id: Pick<Patients, 'name'>
  icu_io_id: string
}

export type IcuChartOrderJoined = IcuChartOrder & {
  icu_io_id: IcuIo
  icu_chart_order_tx_1: IcuChartTx | null
  icu_chart_order_tx_2: IcuChartTx | null
  icu_chart_order_tx_3: IcuChartTx | null
  icu_chart_order_tx_4: IcuChartTx | null
  icu_chart_order_tx_5: IcuChartTx | null
  icu_chart_order_tx_6: IcuChartTx | null
  icu_chart_order_tx_7: IcuChartTx | null
  icu_chart_order_tx_8: IcuChartTx | null
  icu_chart_order_tx_9: IcuChartTx | null
  icu_chart_order_tx_10: IcuChartTx | null
  icu_chart_order_tx_11: IcuChartTx | null
  icu_chart_order_tx_12: IcuChartTx | null
  icu_chart_order_tx_13: IcuChartTx | null
  icu_chart_order_tx_14: IcuChartTx | null
  icu_chart_order_tx_15: IcuChartTx | null
  icu_chart_order_tx_16: IcuChartTx | null
  icu_chart_order_tx_17: IcuChartTx | null
  icu_chart_order_tx_18: IcuChartTx | null
  icu_chart_order_tx_19: IcuChartTx | null
  icu_chart_order_tx_20: IcuChartTx | null
  icu_chart_order_tx_21: IcuChartTx | null
  icu_chart_order_tx_22: IcuChartTx | null
  icu_chart_order_tx_23: IcuChartTx | null
  icu_chart_order_tx_24: IcuChartTx | null
}

export type IcuUserList = Pick<
  User,
  'avatar_url' | 'is_vet' | 'name' | 'position' | 'user_id'
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
    patient_id: Pick<Patients, 'name'>
  }
} & IcuChartBookmark
