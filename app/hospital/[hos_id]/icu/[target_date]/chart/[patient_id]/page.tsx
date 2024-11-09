import ChartEntry from '@/components/hospital/icu/main/chart/chart-entry'
import CheckBeforeIndate from '@/components/hospital/icu/main/chart/check-before-in-date'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import TanstackQuertProvider from '@/providers/tanstack-quert-provider'

export default async function PatientChartPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    patient_id: string
  }>
}) {
  const params = await props.params
  const initialChartData = await getIcuChart(
    params.hos_id,
    params.target_date,
    params.patient_id,
  )

  return (
    <TanstackQuertProvider>
      <CheckBeforeIndate
        chartData={initialChartData}
        patientId={params.patient_id}
      >
        <ChartEntry
          initialChartData={initialChartData}
          hosId={params.hos_id}
          targetDate={params.target_date}
          patientId={params.patient_id}
        />
      </CheckBeforeIndate>
    </TanstackQuertProvider>
  )
}
