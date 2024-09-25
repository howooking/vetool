import Chart from '@/components/hospital/icu/main/chart/chart'
import IcuChart from '@/components/hospital/icu/main/chart/icu-chart'
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
  return <Chart chartData={chartData} />
}
