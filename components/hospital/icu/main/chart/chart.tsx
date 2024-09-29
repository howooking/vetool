import type { SelectedChart } from '@/types/icu'
import ChartBody from './selected-chart/chart-body/chart-body'
import ChartHeader from './selected-chart/chart-header/chart-header'
import OutPatientCover from './selected-chart/out-patient-cover'

export default function Chart({ chartData }: { chartData: SelectedChart }) {
  const isPatientOut = chartData?.icu_io?.out_date !== null
  return (
    <div className="relative flex flex-col gap-2 p-2 pb-[48px]">
      <ChartHeader chartData={chartData} />
      <ChartBody chartData={chartData} />

      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
