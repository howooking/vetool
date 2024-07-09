import { getAgeFromAgeInDays } from '@/lib/utils'
import { Cat, Dog } from 'lucide-react'
import UpdateWeightDialog from './update-weight-dialog'

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
}) {
  return (
    <header className="absolute left-0 top-0 flex h-12 w-full items-center justify-center gap-2 text-muted-foreground">
      {species === 'canine' ? (
        <Dog size={20} className="text-black" />
      ) : (
        <Cat size={20} className="text-black" />
      )}
      <span className="text-black">{name}</span> ·
      <span className="text-sm">{breed}</span> ·
      <span className="text-sm uppercase">{gender}</span> ·
      <span className="text-sm">{getAgeFromAgeInDays(ageInDays)} </span> ·
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
    </header>
  )
}
