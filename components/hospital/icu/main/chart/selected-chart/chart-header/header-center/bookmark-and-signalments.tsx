import { getAgeFromAgeInDays } from '@/lib/utils'
import type { SelectedChart } from '@/types/icu/chart'
import { Cat, Dog } from 'lucide-react'
import BookmarkDialog from './bookmark-dialog'
import UpdateWeightDialog from './update-weight-dialog'

export default function HeaderCenter({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { patient, icu_io, weight, weight_measured_date, icu_chart_id } =
    chartData

  const isPatientOut = !!icu_io.out_date
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md bg-muted p-2 text-xs md:h-12 md:bg-transparent md:text-sm">
      <BookmarkDialog
        icuChartId={chartData.icu_chart_id}
        bookmarkData={chartData.bookmark}
      />
      {patient.species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>
        {patient.name}
        {isPatientOut && '(퇴원)'}
      </span>{' '}
      ·<span>{patient.breed}</span> ·
      <span className="uppercase">{patient.gender}</span> ·
      <span>{getAgeFromAgeInDays(icu_io.age_in_days)} </span> ·
      <UpdateWeightDialog
        weightMesuredDate={weight_measured_date}
        weight={weight}
        patientId={patient.patient_id}
        icuChartId={icu_chart_id}
      />
    </div>
  )
}
