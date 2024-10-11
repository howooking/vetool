import ChartEntry from '@/components/hospital/icu/main/chart/chart-entry'
import CheckBeforeIndate from '@/components/hospital/icu/main/chart/check-before-in-date'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

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
