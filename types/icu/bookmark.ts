export type BookmarkedChart = {
  bookmark_id: string
  bookmark_name: string
  bookmark_comment: string
  icu_chart_id: {
    patient_id: {
      name: string
      patient_id: string
    }
    target_date: string
    icu_chart_id: string
  }
}
