import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import CheckBeforeIndate from '@/components/hospital/icu/main/chart/check-before-in-date'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import type { SelectedChart } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'

export default async function PatientChartPage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
    patient_id: string
  }
}) {
  const { selectedChartData, patientsData } = await getIcuChart(
    params.hos_id,
    params.target_date,
    params.patient_id,
  )

  return (
    <CheckBeforeIndate
      chartData={selectedChartData}
      patientId={params.patient_id}
    >
      <ChartEntry chartData={selectedChartData} patientsData={patientsData} />
    </CheckBeforeIndate>
  )
}

const ChartEntry = ({
  chartData,
  patientsData,
}: {
  chartData: SelectedChart
  patientsData: PatientData[]
}) => {
  // chart가 없는 경우 => 첫날 차트가 아님
  if (!chartData) {
    return <AddChartDialogs chartData={chartData} isFirstChart={false} />
  }

  // chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return <AddChartDialogs isFirstChart={true} chartData={chartData} />
  }

  return <Chart chartData={chartData} patientsData={patientsData} />
}
