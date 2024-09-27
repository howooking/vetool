export type SummaryData = {
  icu_io: {
    in_date: string
    out_date: null
    icu_io_id: string
    created_at: string
  }
  orders: SummaryOrder[]
  weight: string
  patient: {
    name: string
    breed: string
    gender: string
    species: string
    patient_id: string
  }
  patient_id: string
  target_date: string
  icu_chart_id: string
}

export type SummaryOrder = {
  order_times: string[]
  treatments: {
    time: number
  }[]
}
