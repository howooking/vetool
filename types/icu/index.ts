import type {
  Hospital,
  IcuChart,
  IcuChartOrder,
  IcuChartTx,
  IcuIo,
  Patients,
  User,
} from '..'

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
  icu_io_id: IcuIo
  main_vet: MainAndSubVet
  sub_vet: MainAndSubVet | null
}

export type IcuChartOrderJoined = Omit<
  IcuChartOrder,
  | 'icu_io_id'
  | 'icu_chart_order_tx_1'
  | 'icu_chart_order_tx_2'
  | 'icu_chart_order_tx_3'
  | 'icu_chart_order_tx_4'
  | 'icu_chart_order_tx_5'
  | 'icu_chart_order_tx_6'
  | 'icu_chart_order_tx_7'
  | 'icu_chart_order_tx_8'
  | 'icu_chart_order_tx_9'
  | 'icu_chart_order_tx_10'
  | 'icu_chart_order_tx_11'
  | 'icu_chart_order_tx_12'
  | 'icu_chart_order_tx_13'
  | 'icu_chart_order_tx_14'
  | 'icu_chart_order_tx_15'
  | 'icu_chart_order_tx_16'
  | 'icu_chart_order_tx_17'
  | 'icu_chart_order_tx_18'
  | 'icu_chart_order_tx_19'
  | 'icu_chart_order_tx_20'
  | 'icu_chart_order_tx_21'
  | 'icu_chart_order_tx_22'
  | 'icu_chart_order_tx_23'
  | 'icu_chart_order_tx_24'
> & {
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
