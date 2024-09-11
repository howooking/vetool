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
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md bg-muted p-2 text-xs md:h-12 md:bg-transparent md:text-sm">
      <BookmarkDialog icuChartId={icuChartId} bookmarkData={bookmartData} />
      {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>
        {name} {isPatientOut && '(퇴원)'}
      </span>{' '}
      ·<span>{breed}</span> ·<span className="uppercase">{gender}</span> ·
      <span>{getAgeFromAgeInDays(ageInDays)} </span> ·
      <UpdateWeightDialog
        weightMesuredDate={weight_measured_date}
        weight={weight}
        patientId={patientId}
        icuChartId={icuChartId}
      />
    </div>
  )
}
