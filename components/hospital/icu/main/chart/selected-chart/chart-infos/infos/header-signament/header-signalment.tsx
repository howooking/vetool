import DeleteChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/header-signament/delete-chart-dialog'
import OutPatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/header-signament/out-patient-dialog'
import UpdateWeightDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/header-signament/update-weight-dialog'
import { getAgeFromAgeInDays } from '@/lib/utils'
import { Cat, Dog } from 'lucide-react'

export default function HeaderSignalments({
  name,
  breed,
  gender,
  ageInDays,
  weightMeasuredDate,
  weight,
  species,
  patientId,
  icuChartId,
  icuIoId,
  isPatientOut,
}: {
  name: string
  breed: string
  gender: string
  ageInDays: number
  weightMeasuredDate: string | null
  weight: string
  species: string
  patientId: string
  icuChartId: string
  icuIoId: string
  isPatientOut: boolean
}) {
  console.log(isPatientOut)
  return (
    <header className="absolute left-0 top-0 flex h-12 w-full items-center justify-center gap-2 text-muted-foreground">
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
        {weightMeasuredDate ? (
          <span className="text-sm">{`${weight}kg (${weightMeasuredDate} 측정)`}</span>
        ) : (
          <span className="text-sm">체중 미측정</span>
        )}
        <UpdateWeightDialog
          weight={weight}
          patientId={patientId}
          icuChartId={icuChartId}
        />
        <OutPatientDialog
          icuIoId={icuIoId}
          name={name}
          isPatientOut={isPatientOut}
        />
        <DeleteChartDialog
          icuChartId={icuChartId}
          name={name}
          icuIoId={icuIoId}
          patientId={patientId}
        />
      </div>
    </header>
  )
}
