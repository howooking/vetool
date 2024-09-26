import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import { getIcuChartByPatientId } from '@/lib/services/icu/get-icu-chart-by-patient-id'

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

  // chart가 없는 경우 => 첫날 차트가 아닌 경우
  if (!chartData) {
    return <AddChartDialogs chartData={chartData} isFirstChart={false} />
  }

  // chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return <AddChartDialogs isFirstChart={true} chartData={chartData} />
  }

  return <Chart chartData={chartData} />
}
