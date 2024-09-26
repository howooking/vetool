import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import { getIcuChartByPatientId } from '@/lib/services/icu/get-icu-chart-by-patient-id'

export const TEMP_COLOR = {
  po: '#faf5ff',
  feed: '#fdf2f8',
  test: '#fefce8',
  fluid: '#eef2ff',
  manual: '#ecfeff',
  checklist: '#fff7ed',
  injection: '#f0fdf4',
}

export default async function PatientChartPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
    patient_id: string
  }
}) {
  const chartData = await getIcuChartByPatientId(
    params.hos_id,
    params.target_date,
    params.patient_id,
  )

  if (!chartData) {
    return (
      <AddChartDialogs
        orderColors={TEMP_COLOR}
        chartData={chartData}
        isFirstChart={false}
      />
    )
  }

  if (chartData.orders.length === 0) {
    return (
      <AddChartDialogs
        isFirstChart={true}
        orderColors={TEMP_COLOR}
        chartData={chartData}
      />
    )
  }

  return <Chart chartData={chartData} />
}
