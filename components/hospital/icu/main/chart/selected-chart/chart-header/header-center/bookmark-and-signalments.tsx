import { getAgeFromAgeInDays } from '@/lib/utils'
import type { IcuChartBookmark } from '@/types'
import { Cat, Dog } from 'lucide-react'
import BookmarkDialog from './bookmark-dialog'
import UpdateWeightDialog from './update-weight-dialog'

export default function HeaderCenter({
  isPatientOut,
  ageInDays,
  bookmartData,
  species,
  icuChartId,
  gender,
  breed,
  name,
  weight_measured_date,
  weight,
  patientId,
}: {
  species: string
  isPatientOut: boolean
  bookmartData: Pick<
    IcuChartBookmark,
    'bookmark_id' | 'bookmark_name' | 'bookmark_comment'
  > | null
  ageInDays: number
  icuChartId: string
  gender: string
  breed: string
  name: string
  weight_measured_date: string | null
  weight: string
  patientId: string
}) {
  return (
    <div className="flex h-12 w-full items-center justify-center gap-2 text-muted-foreground">
      <BookmarkDialog icuChartId={icuChartId} bookmarkData={bookmartData} />
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
      <div className="flex items-center gap-1">
        {weight_measured_date ? (
          <span className="text-sm">{`${weight}kg (${weight_measured_date} 측정)`}</span>
        ) : (
          <span className="text-sm">체중 미측정</span>
        )}
        <UpdateWeightDialog
          weight={weight}
          patientId={patientId}
          icuChartId={icuChartId}
        />
      </div>
    </div>
  )
}
