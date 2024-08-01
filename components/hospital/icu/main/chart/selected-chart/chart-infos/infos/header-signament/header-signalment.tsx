import { getAgeFromAgeInDays } from '@/lib/utils'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import { Cat, Dog } from 'lucide-react'
import BookmarkDialog from './bookmark-dialog'
import CopyChartButton from './copy-chart-button'
import DeleteChartDialog from './delete-chart-dialog'
import OutPatientDialog from './out-patient-dialog'
import PasteChartDialog from './paste-chart-dialog'
import UpdateWeightDialog from './update-weight-dialog'

export default function HeaderSignalments({
  isPatientOut,
  ageInDays,
  icuIoId,
  chartData,
  selectedChartOrders,
}: {
  isPatientOut: boolean
  ageInDays: number
  icuIoId: string
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  selectedChartOrders: IcuChartOrderJoined[]
}) {
  const { breed, name, gender, species, patient_id } = chartData.patient_id
  const { weight, weight_measured_date, icu_chart_id, bookmark_id } = chartData

  return (
    <header className="absolute left-0 top-0 flex h-12 w-full items-center justify-center gap-2 text-muted-foreground">
      <BookmarkDialog icuChartId={icu_chart_id} bookmarkData={bookmark_id} />
      {species === 'canine' ? (
        <Dog size={20} className="text-black" />
      ) : (
        <Cat size={20} className="text-black" />
      )}
      <span className="text-black">
        {name} {isPatientOut && '(퇴원)'}
      </span>{' '}
      ·<span className="text-sm">{breed}</span> ·
      <span className="text-sm uppercase">{gender}</span> ·
      <span className="text-sm">{getAgeFromAgeInDays(ageInDays)} </span> ·
      <div className="flex items-center">
        {weight_measured_date ? (
          <span className="text-sm">{`${weight}kg (${weight_measured_date} 측정)`}</span>
        ) : (
          <span className="text-sm">체중 미측정</span>
        )}
        <UpdateWeightDialog
          weight={weight}
          patientId={patient_id}
          icuChartId={icu_chart_id}
        />

        <div className="absolute right-2 flex gap-1">
          <CopyChartButton chartId={icu_chart_id} />
          <PasteChartDialog patientId={chartData.patient_id.patient_id} />

          <OutPatientDialog
            icuIoId={icuIoId}
            name={name}
            isPatientOut={isPatientOut}
            selectedChartOrders={selectedChartOrders}
          />
          <DeleteChartDialog
            icuChartId={icu_chart_id}
            name={name}
            icuIoId={icuIoId}
          />
        </div>
      </div>
    </header>
  )
}
